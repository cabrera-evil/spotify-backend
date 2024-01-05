const albumService = require('../services/album.service');

const createAlbum = async (req, res) => {
    try {
        const album = await albumService.createAlbum(req.body);
        res.status(201).json({ message: 'Album created', data: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAlbums = async (req, res) => {
    try {
        const albums = await albumService.getAlbums();
        res.status(200).json({ message: 'Albums retrieved', data: albums });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAlbum = async (req, res) => {
    try {
        const album = await albumService.getAlbum(req.params.id);
        res.status(200).json({ message: 'Album retrieved', data: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAlbum = async (req, res) => {
    try {
        const album = await albumService.updateAlbum(req.params.id, req.body);
        res.status(200).json({ message: 'Album updated', data: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const album = await albumService.deleteAlbum(req.params.id);
        res.status(200).json({ message: 'Album deleted', data: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createAlbum,
    getAlbums,
    getAlbum,
    updateAlbum,
    deleteAlbum
}