var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const albumController = require('../controllers/album.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.post('/', [
    authenticateToken,
    validateRole(['admin']),
    check('name').isLength({ min: 2 }),
    check('releaseDate').isDate(),
    validateRequest,
], albumController.createAlbum);

router.get('/', albumController.getAlbums);

router.get('/:id', albumController.getAlbum);

router.patch('/:id', [
    authenticateToken,
    validateRole(['admin']),
    check('name').isLength({ min: 2 }),
    check('releaseDate').isDate(),
    check('status').isBoolean(),
    validateRequest,
], albumController.updateAlbum);

router.delete('/:id', [
    authenticateToken,
    validateRole(['admin']),
], albumController.deleteAlbum);

module.exports = router;
