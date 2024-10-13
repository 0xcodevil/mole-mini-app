const fs = require('fs');
const path = require('path');

const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const Follow = require('../models/Follow');
const BoostItem = require('../models/BoostItem');

const logger = require('../helper/logger');
const { BONUS, TELEGRAM, LEADERBOARD_SHOW_USER_COUNT } = require('../helper/constants');
const { createInvoiceLink } = require('../helper/botHelper');

const startGame = async (req, res) => {
  const { userid } = req.body;
  var user = await User.findOne({ userid });
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no user!'});
  }
  if(user.ticket <= 0) {
    return res.status(StatusCodes.OK).json({success: false, status: 'noticket', msg: 'There is no ticket!'});
  }
  user.ticket -= 1;
  await user.save();
  return res.status(StatusCodes.OK).json({success: true, ticket: user.ticket});
}

const swapTicket = async (req, res) => {
    const { userid, point } = req.body;
    var user = await User.findOne({ userid });
    if(!user) {
      return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no user!'});
    }
    if(point == 100) {
        user.ticket += 1;
    } else if(point == 250) {
        user.ticket += 3;
    } else if(point == 400) {
        user.ticket += 5;
    } else {
        return res.status(StatusCodes.OK).json({success: false, status: 'invalid', msg: 'Invalid point count!'});
    }
    if(user.point < point) {
        return res.status(StatusCodes.OK).json({success: false, status: 'nopoint', msg: 'There are not enough point!'});
    }
    user.addPoint(-point);
    await user.save();
    return res.status(StatusCodes.OK).json({success: true, ticket: user.ticket, point: user.point});
}
const addPlayedPoint = async (req, res) => {
    const { userid, point } = req.body;
    var user = await User.findOne({ userid });
    if(!user) {
      return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no user!'});
    }
    user.addPoint(point);
    await user.save();
    return res.status(StatusCodes.OK).json({success: true, ticket: user.ticket, point: user.point});
}

//boost
const useBoost = async (req, res) => {
  const { userid, boostid } = req.body;
  var user = await User.findOne({ userid }).populate('boosts.item');
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'Not found user!'});
  }

  const boost = user.boosts.find(b => b.item.boostid == boostid);
  if (!boost || boost.usesRemaining <= 0) {
    return res.status(StatusCodes.OK).json({success: false, status: 'noboostitem', msg: 'Not found boost item!'});
  }

  boost.usesRemaining -= 1;
  if (boost.usesRemaining === 0) {
    user.boosts = user.boosts.filter(b => b.item.boostid != boostid);
  }
  await user.save();
  
  return res.status(StatusCodes.OK).json({success: true, msg: 'Use boost successfully!'});
}
const getAllBoost = async (req, res) => {
  const boosts = await BoostItem.find({});
  return res.status(StatusCodes.OK).json({boosts});
}
const addBoost = async (req, res) => {
  const { boostid, title, description, logo, maxUses, price, bonus } = req.body;
  const boostItem = await BoostItem.findOne({boostid});
  if(boostItem) {
    return res.status(StatusCodes.OK).json({success: false, status: 'exist', msg: 'Boost name already exist!'});
  }
  await BoostItem.create({
    boostid,
    title,
    description,
    logo,
    maxUses,
    price,
    bonus
  });
  return res.status(StatusCodes.OK).json({status: true, msg: 'Boost add success!'});
}
const getMyBoost = async (req, res) => {
  const { userid } = req.params;
  const user = await User.findOne({ userid }).populate('boosts.item');
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'Not found user!'});
  }

  const currentTime = new Date();
  for (const boost of user.boosts) {
    if (currentTime < boost.endTime) {
      boost.endMS = boost.endTime - currentTime;
      return res.status(StatusCodes.OK).json({success: true, boost});
    }
  }
  return res.status(StatusCodes.OK).json({success: false, status: 'noboost', msg: 'You did not buy boost!'});
}
const getTotalBoostHistory = async (req, res) => {
  const result = await BoostPurchaseHistory.aggregate([
    {
      $lookup: {
        from: 'boostitems', // The name of the BoostItem collection
        localField: 'boostItem',
        foreignField: '_id',
        as: 'boostDetails',
      },
    },
    {
      $unwind: '$boostDetails', // Unwind to access boost details
    },
    {
      $group: {
        _id: null,
        totalUniqueUsers: { $addToSet: '$user' }, // Collect unique users
        totalPrice: { $sum: { $multiply: ['$quantity', '$boostDetails.price'] } }, // Calculate total price
      },
    },
    {
      $project: {
        _id: 0,
        totalUniqueUsers: { $size: '$totalUniqueUsers' }, // Count unique users
        totalPrice: 1, // Include total price
      },
    },
  ]);
  return res.status(StatusCodes.OK).json({success: true, result});
}
//star invoice
const generateInvoice = async(req, res) => {
  const {userid, boostid} = req.body;
  var user = await User.findOne({ userid });
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no user!'});
  }
  const boost = await BoostItem.findOne({boostid});
  if(!boost) {
    return res.status(StatusCodes.OK).json({success: false, status: 'noboost', msg: 'There is no boost item!'});
  }

  const paylog = { userid: user._id, boostid: boost._id };
  const invoiceLink = await createInvoiceLink(boost.title, boost.description, JSON.stringify(paylog), boost.price);
  console.log("invoiceLink=", invoiceLink);
  return res.status(StatusCodes.OK).json({success: true, link: invoiceLink});
}

module.exports = {
    startGame,
    swapTicket,
    addPlayedPoint,
    
    useBoost,
    getAllBoost,
    getMyBoost,
    addBoost,
    getTotalBoostHistory,

    generateInvoice,
};
