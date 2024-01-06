var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const playlistController = require('../controllers/playlist.controller');

// Middlewares
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.post('/',[
    authenticateToken,
    check("name", "Please enter a valid name").isString().notEmpty(),
    validateRequest
], playlistController.createPlaylist);

router.get('/', authenticateToken, playlistController.getPlaylists);

router.get('/:id', authenticateToken, playlistController.getPlaylist);

router.patch('/:id/add-song', [
    authenticateToken,
    check("songId", "Please enter a valid songId").isInt().notEmpty(),
    validateRequest
], playlistController.addSongToPlaylist);

router.patch('/:id', [
    authenticateToken,
    check("name", "Please enter a valid name").isString().notEmpty(),
    validateRequest
], playlistController.updatePlaylist);

router.patch('/:id/recover-playlist', authenticateToken, playlistController.recoverPlaylist);

router.delete('/:id', authenticateToken, playlistController.deletePlaylist);

router.delete('/:id/remove-song', [
    authenticateToken,
    check("songId", "Please enter a valid songId").isInt().notEmpty(),
    validateRequest
], playlistController.removeSongFromPlaylist);

module.exports = router;
