const express = require('express');
const router = express.Router();
const SigninController = require('../controllers/signin.controller');
const { verifySignin } = require('../middlewares/auth.middleware');

router.post('/', verifySignin, SigninController.signIn);

module.exports = router;