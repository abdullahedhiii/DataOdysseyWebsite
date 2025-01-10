const express = require('express');
const router = express.Router();
const {sendQueries} = require('../controllers/competition.controller');

router.get('/queries/:level',sendQueries)

module.exports = router;