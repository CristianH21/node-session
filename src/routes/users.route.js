const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/token.middleware');

router.get('/', verifyToken, UsersController.getUsers);

module.exports = router;