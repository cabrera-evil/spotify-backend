const artistService = require('../services/artist.service');

const createArtist = async (req, res) => {
    try {
        const artist = await artistService.createArtist(req.body);
        res.status(201).json({ message: 'Artist created', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getArtists = async (req, res) => {
    try {
        const artists = await artistService.getArtists();
        res.status(200).json({ message: 'Artists retrieved', data: artists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getArtistById = async (req, res) => {
    try {
        const artist = await artistService.getArtistById(req.params.id);
        res.status(200).json({ message: 'Artist retrieved', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateArtist = async (req, res) => {
    try {
        const artist = await artistService.updateArtist(req.params.id, req.body);
        res.status(200).json({ message: 'Artist updated', data: artist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteArtist = async (req, res) => {
    try {
        const artist = await artistService.deleteArtist(req.params.id);
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