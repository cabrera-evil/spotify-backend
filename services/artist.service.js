const ArtistModel = require('../models/artist.model');

/**
 * @description Create a new artist
 * @param {Object} artist
 * @returns {Object} Artist created
 */
const createArtist = async (artist) => {
    try {
        const newArtist = await ArtistModel.create(artist);
        return newArtist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Get all artists
 * @returns {Array} Artists
 */
const getArtists = async () => {
    try {
        const artists = await ArtistModel.findAll();
        if (!artists) throw new Error('Artists not found');
        return artists;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Get an artist
 * @param {Number} id
 * @returns {Object} Artist
 */
const getArtistById = async (id) => {
    try {
        const artist = await ArtistModel.findByPk(id);
        if (!artist) throw new Error('Artist not found');
        return artist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Update an artist
 * @param {Number} id
 * @param {Object} artist
 * @returns {Object} Artist updated
 */
const updateArtist = async (id, artist) => {
    try {
        const [rowsUpdated, [updatedArtist]] = await ArtistModel.update(artist, {
            where: { id },
            returning: true,
        });
        if (rowsUpdated === 0)
            throw new Error('Artist not found');
        return updatedArtist;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Delete an artist
 * @param {Number} id
 * @returns {Object} Artist deleted
 */
const deleteArtist = async (id) => {
    try {
        const [rowsUpdated, [deletedArtist]] = await ArtistModel.update(
            { status: false },
            {
                where: { id },
                returning: true,
            }
        );
        if (rowsUpdated === 0)
            throw new Error('Artist not found');
        return deletedArtist;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
}