const express = require('express');
const router = express.Router();
const {
    authenticateUser,
} = require('../middleware/authentication');

const {
    startGame,
    swapTicket,
    addPlayedPoint,

    useBoost,
    addBoost,
    getAllBoost,
    getMyBoost,
    getTotalBoostHistory,

    generateInvoice,
} = require('../controllers/playController');

router.post('/start', authenticateUser, startGame);
router.post('/swap', authenticateUser, swapTicket);
router.post('/result', authenticateUser, addPlayedPoint);

router.post('/boost/use', authenticateUser, useBoost);
router.post('/boost/add', addBoost);
router.get('/boost/getall', authenticateUser, getAllBoost);
router.get('/boost/getmy/:userid', authenticateUser, getMyBoost);
router.get('/boost/gethistory', authenticateUser, getTotalBoostHistory);

router.post('/invoice', authenticateUser, generateInvoice);

module.exports = router;
