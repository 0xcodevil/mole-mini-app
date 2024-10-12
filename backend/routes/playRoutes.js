const express = require('express');
const router = express.Router();
const {
    authenticateUser,
} = require('../middleware/authentication');

const {
    startGame,
    swapTicket,
    addPlayedPoint,
    purchaseItems,
    useItem,
} = require('../controllers/playController');

router.post('/start', authenticateUser, startGame);
router.post('/swap', authenticateUser, swapTicket);
router.post('/result', authenticateUser, addPlayedPoint);
router.post('/purchase', authenticateUser, purchaseItems);
router.post('/useitem', authenticateUser, useItem);

module.exports = router;
