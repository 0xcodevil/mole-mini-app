const express = require('express');
const router = express.Router();
const {
    authenticateUser,
} = require('../middleware/authentication');

const {
    getUser,
    getAllFriends,
    getLeaderboard,
    getAllUserCount,
    
    checkTask,
    doTask,
    getAllTaskList,
    getMyTaskList,

    inviteTask,

    getAvatarImage,
    claimDailyReward,

} = require('../controllers/userController');

router.get('/get/:userid', authenticateUser, getUser);
router.get('/friends/:userid', authenticateUser, getAllFriends);
router.get('/ranking/:userid/:type', authenticateUser, getLeaderboard);
router.get('/count/all', authenticateUser, getAllUserCount);

router.post('/task/check', authenticateUser, checkTask);
router.post('/task/do', authenticateUser, doTask);
router.get('/task/getall', authenticateUser, getAllTaskList);
router.get('/task/getmy/:userid', authenticateUser, getMyTaskList);

router.post('/invite/task', authenticateUser, inviteTask);

router.get('/avatar/:userid', getAvatarImage);
router.post('/claim/daily', authenticateUser, claimDailyReward);

module.exports = router;
