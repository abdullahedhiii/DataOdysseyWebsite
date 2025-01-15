const express = require('express');
const { loginUser, logoutUser, registerUser, retrieveCookie } = require('../controllers/user.controller');
const router = express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/logout',logoutUser);
router.get('/check-session',retrieveCookie);
module.exports = router;