const express = require('express')
const router = express.Router()
const { updateTimings, getCompetitionTimings } = require('../controllers/manage.controller');

router.post('/updateTimings',updateTimings);
router.get('/getCompetitionTimings',getCompetitionTimings);

module.exports = router;