const playlistService = require('../services/playlist.service');

const createPlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.createPlaylist(req.body, req.user.id);
        res.status(200).json({ message: 'Playlist created', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPlaylists = async (req, res) => {
    try {
        const playlists = await playlistService.getPlaylists(req.user.id);
        res.status(200).json({ message: 'Playlists retrieved', data: playlists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.getPlaylist(req.params.id);
        res.status(200).json({ message: 'Playlist retrieved', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addSongToPlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.addSongToPlaylist(req.params.id, req.body.songId);
        res.status(200).json({ message: 'Song added to playlist', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.updatePlaylist(req.params.id, req.body.name);
        res.status(200).json({ message: 'Playlist updated', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const recoverPlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.recoverPlaylist(req.params.id);
        res.status(200).json({ message: 'Playlist recovered', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.deletePlaylist(req.params.id);
        res.status(200).json({ message: 'Playlist deleted', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeSongFromPlaylist = async (req, res) => {
    try {
        const playlist = await playlistService.removeSongFromPlaylist(req.params.id, req.body.songId);
        res.status(200).json({ message: 'Song removed from playlist', data: playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylist,
    addSongToPlaylist,
    recoverPlaylist,
    updatePlaylist,
    deletePlaylist,
    removeSongFromPlaylist,
}