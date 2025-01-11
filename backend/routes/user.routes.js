const express = require('express');
const { loginUser, logoutUser, registerUser } = require('../controllers/user.controller');
const router = express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/logout',logoutUser);

module.exports = router;