var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const authController = require('../controllers/auth.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");

router.post('/register', [
    check('username').isString().isLength({ min: 2 }).notEmpty(),
    check('email').isEmail().notEmpty(),
    check('password').isString().isLength({ min: 6 }).notEmpty(),
    check('birthDate').isString().matches(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/).notEmpty(),
    check('sex').isString().notEmpty(),
    check('country').isString().notEmpty(),
    check('zipCode').isString().notEmpty(),
    validateRequest,
], authController.register);

router.post('/login', [
    check('username').isString().isLength({ min: 2 }).notEmpty(),
    check('password').isString().isLength({ min: 6 }).notEmpty(),
    validateRequest,
], authController.login);

router.post('/profile', [
    authenticateToken,
], authController.profile);

module.exports = router;
