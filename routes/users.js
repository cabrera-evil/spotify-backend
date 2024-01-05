var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
