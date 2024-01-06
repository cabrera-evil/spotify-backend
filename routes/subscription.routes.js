var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const subscriptionController = require('../controllers/subscription.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.patch('/upgrade', [
    authenticateToken,
    validateRole(['user']),
    check("creditCard.number").isCreditCard().optional(),
    check("creditCard.expirationMonth").isNumeric().optional(),
    check("creditCard.expirationYear").isNumeric().optional(),
    check("creditCard.cvv").isNumeric().optional(),
    check("paypal.username").isString().optional(),
    validateRequest,
], subscriptionController.upgradeSubscription);

router.delete('/cancel', [
    authenticateToken,
    validateRole(['user'])
], subscriptionController.cancelSubscription);

module.exports = router;