const ArtistModel = require('../models/artist.model');

const createArtist = async (artist) => {
    try {
        const newArtist = await ArtistModel.create(artist);
        return newArtist;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getArtists = async () => {
    try {
        const artists = await ArtistModel.findAll();
        if (!artists) throw new Error('Artists not found');
        return artists;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createArtist,
    getArtists
}