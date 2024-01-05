var express = require('express');
var router = express.Router();
const albumController = require('../controllers/album.controller');

router.post('/', albumController.createAlbum);

router.get('/', albumController.getAlbums);

router.get('/:id', albumController.getAlbum);

router.patch('/:id', albumController.updateAlbum);

router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
