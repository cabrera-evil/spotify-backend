const AlbumModel = require('../models/album.model');
const SongModel = require('../models/song.model');

/**
 * @description Create an album
 * @param {Object} album Album object
 * @returns {Promise<Object>} Promise to be resolved with the created album
 */
const createAlbum = async (request) => {
    try {
        const { album, songs } = request;
        const newAlbum = await AlbumModel.create(album);
        if (songs && songs.length) {
            const songsToCreate = songs.map(song => ({
                ...song,
                albumId: newAlbum.id,
            }));
            await SongModel.bulkCreate(songsToCreate);
        }
        return newAlbum;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @description Get all albums
 * @returns {Promise<Array>} Promise to be resolved with an array of albums
 */
const getAlbums = async () => {
    try {
        return await AlbumModel.findAll({
            include: [
                {
                    model: SongModel,
                    attributes: ['id', 'name', 'duration'],
                },
            ],
        });
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @description Get an album by id
 * @param {number} id Album id
 * @returns {Promise<Object>} Promise to be resolved with the album
 */
const getAlbum = async (id) => {
    try {
        return await AlbumModel.findByPk(id, {
            include: [
                {
                    model: SongModel,
                    attributes: ['id', 'name', 'duration'],
                },
            ],
        });
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @description Update an album
 * @param {number} id Album id
 * @param {Object} album Album object
 * @returns {Promise<Object>} Promise to be resolved with the updated album
 */
const updateAlbum = async (id, album) => {
    try {
        const [rowsUpdated, [updatedAlbum]] = await AlbumModel.update(album, {
            where: { id },
            returning: true,
        });
        if (rowsUpdated === 0) throw new Error('Album not found');
        return updatedAlbum;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @description Delete an album
 * @param {number} id Album id
 * @returns {Promise<Object>} Promise to be resolved with the deleted album
 */
const deleteAlbum = async (id) => {
    try {
        const album = await AlbumModel.findByPk(id);
        if (!album) throw new Error('Album not found');
        await album.destroy();
        return album;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createAlbum,
    getAlbums,
    getAlbum,
    updateAlbum,
    deleteAlbum,
}