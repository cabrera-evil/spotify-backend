const arstistService = require('../services/artist.service');

const createArtist = async (req, res) => {
    try {
        const artist = await arstistService.createArtist(req.body);
        res.status(201).json({ message: 'Artist created', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getArtists = async (res) => {
    try {
        const artists = await arstistService.getArtists();
        res.status(200).json({ message: 'Artists retrieved', data: artists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createArtist,
    getArtists
}