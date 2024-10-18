const express = require('express');
const router = express.Router();
const {
    authenticateUser,
} = require('../middleware/authentication');

const {
    checkFarmStatus,
    startFarm,
    claimFarm
} = require('../controllers/farmController');

router.get('/status', authenticateUser, checkFarmStatus);
router.post('/start', authenticateUser, startFarm);
router.post('/claim', authenticateUser, claimFarm);

module.exports = router;