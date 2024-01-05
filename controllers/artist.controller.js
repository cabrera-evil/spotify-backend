const arstistService = require('../services/artist.service');

const createArtist = async (req, res) => {
    try {
        const artist = await arstistService.createArtist(req.body);
        res.status(201).json({ message: 'Artist created', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getArtists = async (req, res) => {
    try {
        const artists = await arstistService.getArtists();
        res.status(200).json({ message: 'Artists retrieved', data: artists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getArtistById = async (req, res) => {
    try {
        const artist = await arstistService.getArtistById(req.params.id);
        res.status(200).json({ message: 'Artist retrieved', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateArtist = async (req, res) => {
    try {
        const artist = await arstistService.updateArtist(req.params.id, req.body);
        res.status(200).json({ message: 'Artist updated', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteArtist = async (req, res) => {
    try {
        const artist = await arstistService.deleteArtist(req.params.id);
        res.status(200).json({ message: 'Artist deleted', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
}