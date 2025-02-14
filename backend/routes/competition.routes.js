const express = require('express');
const router = express.Router();
const {sendQueries,submitQuery, sendLeaderboardData} = require('../controllers/competition.controller');

router.get('/queries/:id',sendQueries)
router.get('/leaderboardData',sendLeaderboardData)
router.post('/submitFile',submitQuery);


module.exports = router;