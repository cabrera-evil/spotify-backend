const PlaylistModel = require('../models/playlist.model');
const SongModel = require('../models/song.model');

/**
 * @description Create a playlist
 * @param {Object} playlist Playlist object
 * @param {number} userId User id
 * @returns {Promise<Object>} Promise to be resolved with the created playlist
 */
const createPlaylist = async (playlist, userId) => {
    try {
        const newPlaylist = await PlaylistModel.create({ ...playlist, userId });
        return newPlaylist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Get all playlists
 * @param {number} userId User id
 * @returns {Promise<Array>} Promise to be resolved with an array of playlists
 */
const getPlaylists = async (userId) => {
    try {
        const playlists = await PlaylistModel.findAll({
            where: { userId, status: true },
            include: [
                {
                    model: SongModel,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        return playlists;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Get a playlist by id
 * @param {number} id Playlist id
 * @returns {Promise<Object>} Promise to be resolved with the playlist
 */
const getPlaylist = async (id) => {
    try {
        const playlist = await PlaylistModel.findByPk(id, {
            include: [
                {
                    model: SongModel,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (!playlist) throw new Error('Playlist not found');
        return playlist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Add a song to a playlist
 * @param {number} playlistId Playlist id
 * @param {number} songId Song id
 * @returns {Promise<Object>} Promise to be resolved with the playlist
 */
const addSongToPlaylist = async (playlistId, songId) => {
    try {
        // If the playlist is not owned by the user or does not exist, throw an error
        const playlist = await PlaylistModel.findOne({ where: { id: playlistId } });
        if (!playlist) throw new Error('Playlist not found');

        // If the song does not exist, throw an error
        const song = await SongModel.findOne({ where: { id: songId } });
        if (!song) throw new Error('Song not found');

        // If the song is already in the playlist, throw an error
        const songInPlaylist = await playlist.hasSong(song);
        if (songInPlaylist) throw new Error('Song already in playlist');

        // Add song to playlist
        await playlist.addSong(song);
        playlist.songCount++;
        await playlist.save();
        return playlist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Recover a playlist
 * @param {number} id Playlist id
 * @returns {Promise<Object>} Promise to be resolved with the recovered playlist
 */
const recoverPlaylist = async (id) => {
    try {
        // Update the status to true and save the deletedAt date
        const [rowsUpdated, [updatedPlaylist]] = await PlaylistModel.update({ status: true, deletedAt: null }, {
            where: { id },
            returning: true
        });

        if (rowsUpdated === 0) throw new Error('Playlist not found');

        return updatedPlaylist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Update a playlist
 * @param {number} id Playlist id
 * @param {string} playlistName Playlist name
 * @returns {Promise<Object>} Promise to be resolved with the updated playlist
 */
const updatePlaylist = async (id, playlistName) => {
    try {
        const [rowsUpdated, [updatedPlaylist]] = await PlaylistModel.update({ name: playlistName }, {
            where: { id },
            returning: true
        });
        if (rowsUpdated === 0) throw new Error('Playlist not found');
        return updatedPlaylist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Delete a playlist
 * @param {number} id Playlist id
 * @returns {Promise<Object>} Promise to be resolved with the deleted playlist
 */
const deletePlaylist = async (id) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Update the status to false and save the deletedAt date
        const [rowsUpdated, [updatedPlaylist]] = await PlaylistModel.update({ status: false, deletedAt: currentDate }, {
            where: { id },
            returning: true
        });

        if (rowsUpdated === 0) {
            throw new Error('Playlist not found');
        }

        return updatedPlaylist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Remove a song from a playlist
 * @param {number} playlistId Playlist id
 * @param {number} songId Song id
 * @returns {Promise<Object>} Promise to be resolved with the playlist
 */
const removeSongFromPlaylist = async (playlistId, songId) => {
    try {
        // If the playlist is not owned by the user or does not exist, throw an error
        const playlist = await PlaylistModel.findOne({ where: { id: playlistId } });
        if (!playlist) throw new Error('Playlist not found');

        // If the song does not exist, throw an error
        const song = await SongModel.findOne({ where: { id: songId } });
        if (!song) throw new Error('Song not found');

        // If the song is not in the playlist, throw an error
        const songInPlaylist = await playlist.hasSong(song);
        if (!songInPlaylist) throw new Error('Song not in playlist');

        // Remove song from playlist
        await playlist.removeSong(song);
        playlist.songCount--;
        await playlist.save();
        return playlist;
    } catch (error) {
        throw new Error(error.message);
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
