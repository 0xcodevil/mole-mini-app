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
    if(point == 20) {
        user.ticket += 1;
    } else if(point == 50) {
        user.ticket += 3;
    } else if(point == 100) {
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
module.exports = {
    startGame,
    swapTicket,
    addPlayedPoint,
};
