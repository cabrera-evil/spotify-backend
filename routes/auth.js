var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const authController = require('../controllers/auth.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");

router.post('/register', [
    check('username').isLength({ min: 2 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('birthDate').matches(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/),
    check('sex').isString(),
    check('country').isString(),
    check('zipCode').isString(),
    validateRequest,
], authController.register);

router.post('/login', [
    check('username').isLength({ min: 2 }),
    check('password').isLength({ min: 6 }),
    validateRequest,
], authController.login);

router.post('/profile', [
    authenticateToken,
], authController.profile);

module.exports = router;
