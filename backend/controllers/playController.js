const fs = require('fs');
const path = require('path');

const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const Follow = require('../models/Follow');
const BoostItem = require('../models/BoostItem');

const logger = require('../helper/logger');
const { BONUS, TELEGRAM, LEADERBOARD_SHOW_USER_COUNT } = require('../helper/constants');
const { isUserTGJoined } = require('../helper/botHelper');

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
const purchaseItems = async (req, res) => {
  const { userid, type } = req.body;
  var user = await User.findOne({ userid });
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no user!'});
  }
  if(type === "golden") {
    user.golden ++;
    await user.save();
  }
  if(type === "wooden") {
    user.wooden ++;
    await user.save();
  }
  return res.status(StatusCodes.OK).json({success: true, golden: user.golden, wooden: user.wooden});
}
const useItem = async (req, res) => {
  const { userid, type } = req.body;
  var user = await User.findOne({ userid });
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no user!'});
  }
  if(type === "golden") {
    if (user.golden > 0) {
      user.golden --;
      await user.save();
    } else {
      return res.status(StatusCodes.OK).json({ success: false, status: 'nogolden', msg: 'There is no golden harmmer!'});
    }
  }
  if(type === "wooden") {
    if (user.golden > 0) {
      user.wooden --;
      await user.save();
    } else {
      return res.status(StatusCodes.OK).json({ success: false, status: 'nowooden', msg: 'There is no wooden harmmer!'});
    }
  }
  return res.status(StatusCodes.OK).json({success: true, golden: user.golden, super: user.super});
}
module.exports = {
    startGame,
    swapTicket,
    addPlayedPoint,
    purchaseItems,
    useItem,
};
