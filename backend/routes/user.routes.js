const express = require('express');
const { loginUser, logoutUser, registerUser, submitQuery } = require('../controllers/user.controller');
const router = express.Router();
const upload = require('../config/multerConfig'); 

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/logout',logoutUser);
router.post('/submitFile',upload.single('file'),submitQuery);

module.exports = router;