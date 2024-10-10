require('dotenv').config();
const logger = require('./logger');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN);
const CHANNEL_ID = '-1002153654987'; //macro

module.exports.isUserTGJoined = (userId, channelId = CHANNEL_ID) => bot.getChatMember(channelId, userId)
.then((chatMember) => {
    if (chatMember.status === 'member' || chatMember.status === 'creator' || chatMember.status === 'administrator') {
        logger.info(`isUserTGJoined User#${userId} is a ${chatMember.status} of the channel.`,);
        return true;
    } else {
        logger.info(`isUserTGJoined User#${userId} is not a member of the channel.`);
        return false;
    }
})
.catch((error) => {
    logger.error(error.message, 'isUserTGJoined Telegram Bot Api Error:');
    return false;
});
