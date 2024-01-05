var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const artistController = require('../controllers/artist.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.post('/', [
    authenticateToken,
    validateRole(['admin']),
    check('name').isLength({ min: 2 }),
    validateRequest,
], artistController.createArtist);

router.get('/', artistController.getArtists);

router.get('/:id', artistController.getArtistById);

router.patch('/:id', [
    authenticateToken,
    validateRole(['admin']),
    check('name').isLength({ min: 2 }),
    check('status').isBoolean(),
    validateRequest,
], artistController.updateArtist);

router.delete('/:id', [
    authenticateToken,
    validateRole(['admin']),
], artistController.deleteArtist);

module.exports = router;
