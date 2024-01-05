var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const userController = require('../controllers/user.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.get('/', [
    authenticateToken,
    validateRole(['admin']),
], userController.getUsers);

router.get('/:id', [
    authenticateToken,
    validateRole(['admin']),
], userController.getUser);

router.patch('/:id', [
    authenticateToken,
    validateRole(['admin']),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    validateRequest,
], userController.updateUser);

router.delete('/:id', [
    authenticateToken,
    validateRole(['admin']),
], userController.deleteUser);

module.exports = router;
