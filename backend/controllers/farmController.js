const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');

const { FARM } = require('../helper/constants');

const checkFarmStatus = async (req, res) => {
    const { userid } = req.body;
    const user = await User.findOne({ userid });
    const remainTime = user.lastFarmAt - new Date() + FARM.duration;
    return res.status(StatusCodes.OK).json({ started: user.farmStarted, startedAt: user.lastFarmAt, remainTime, ...FARM });
}

const startFarm = async (req, res) => {
    const { userid } = req.body;
    const user = await User.findOne({ userid });

    if (user.farmStarted) {
        return res.status(StatusCodes.OK).json({ success: false, msg: 'Farm is already started.' });
    }
    user.farmStarted = true;
    user.lastFarmAt = Date.now();
    await user.save();
    return res.status(StatusCodes.OK).json({ success: true, remainTime: FARM.duration });
}

const claimFarm = async (req, res) => {
    const { userid } = req.body;
    const user = await User.findOne({ userid });

    if (!user.farmStarted) {
        return res.status(StatusCodes.OK).json({ success: false, msg: 'Farm is not started.' });
    }

    const remainTime = user.lastFarmAt - new Date() + FARM.duration;
    if (remainTime > 0) {
        return res.status(StatusCodes.OK).json({ success: false, msg: 'Farm is not finished.', remainTime });
    }

    user.farmStarted = false;
    user.addPoint(FARM.reward);

    await user.save();
    return res.status(StatusCodes.OK).json({ success: true, point: user.point, reward: FARM.reward });
}

module.exports = {
    checkFarmStatus,
    startFarm,
    claimFarm
}