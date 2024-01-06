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
    check('album.name').isLength({ min: 2 }).notEmpty(),
    check('album.releaseDate').matches(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/).notEmpty(),
    check('album.cover').isURL().optional(),
    check('songs').isArray({ min: 1 }).notEmpty(),
    check('songs.*.name').isLength({ min: 2 }).notEmpty(),
    check('songs.*.duration').isInt({ min: 1 }).notEmpty(),
    check('songs.*.timesPlayed').isInt({ min: 0 }).optional(),
    validateRequest,
], albumController.createAlbum);

router.get('/', albumController.getAlbums);

router.get('/:id', albumController.getAlbum);

router.patch('/:id', [
    authenticateToken,
    validateRole(['admin']),
    check('album.name').isLength({ min: 2 }).optional(),
    check('album.releaseDate').matches(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/).optional(),
    check('songs').isArray({ min: 1 }).optional(),
    check('songs.*.name').isLength({ min: 2 }).optional(),
    check('songs.*.duration').isInt({ min: 1 }).optional(),
    validateRequest,
], albumController.updateAlbum);

router.delete('/:id', [
    authenticateToken,
    validateRole(['admin']),
], albumController.deleteAlbum);

module.exports = router;
