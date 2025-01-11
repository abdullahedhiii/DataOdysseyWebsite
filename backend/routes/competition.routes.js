const express = require('express');
const router = express.Router();
const {sendQueries,submitQuery} = require('../controllers/competition.controller');
const uploadMiddleware = require('../config/multerConfig'); 

router.get('/queries/:level',sendQueries)
router.post('/submitFile',uploadMiddleware,submitQuery);


module.exports = router;