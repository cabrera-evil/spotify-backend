var express = require('express');
var router = express.Router();
const artistController = require('../controllers/artist.controller');

router.post('/', artistController.createArtist);

router.get('/', artistController.getArtists);

module.exports = router;
