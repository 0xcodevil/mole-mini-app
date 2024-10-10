const User = require('../models/User');
const logger = require('../helper/logger');
const { createJWT } = require('../utils/jwt');
const { BONUS } = require('../helper/constants');

const login = async (userid, username, firstname, lastname, is_premium, inviter) => {
    logger.info(`authlogin userid=${userid}, username=${username}, firstname=${firstname}, lastname=${lastname}, inviter=${inviter}, premium=${is_premium}`);
  
    if (!userid) {
      logger.error('authlogin not found userid');
      return {success: false, msg: 'failed'};
    }
  
    var user = await User.findOne({ userid });
    if (!user) {
      user = await User.create({
        userid,
        username,
        firstname, lastname,
        isPremim: is_premium,
        inviter,
      });
      if(inviter && inviter != '') {
        var inviteUser = await User.findOne({userid: inviter});
        if(inviteUser && !inviteUser.friends.includes(user._id)) {
          logger.info('inviter bonus start')
          inviteUser.friends.push(user._id);
          inviteUser.addPoint(is_premium ? BONUS.INVITE_FRIEND_WITH_PREMIUM : BONUS.INVITE_FRIEND)
          inviteUser.ticket += (inviteUser.friends.length % 10 == 0) ? inviteUser.friends.length / 10 : 0;
          await inviteUser.save();
        }
      }
    }
    const token = createJWT({ payload: { userid, username } });
    return {success: true, token, msg: 'login success'};
};

module.exports = login;