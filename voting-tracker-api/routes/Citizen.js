const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/Citizen.js');
const checkExpiredToken = require('../middlewares/checkExpiredToken.js');

// To view the transaction
router.post('/getc', citizenController.get);
router.post('/checkc', citizenController.check);
router.post('/verifyc', checkExpiredToken, citizenController.verify);

module.exports = router;
