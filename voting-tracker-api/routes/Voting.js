const express = require('express');
const router = express.Router();
const voteController = require('../controllers/Vote');

router.post('/updatestatus', voteController.updateStatus);
router.post('/cancelvote', voteController.cancelVote);

module.exports = router;
