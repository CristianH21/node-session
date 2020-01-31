const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/signup.controller');
const { verifySignup } = require('../middlewares/auth.middleware');

router.post('/', verifySignup, SignupController.signUp);

module.exports = router;