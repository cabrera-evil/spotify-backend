const AlbumModel = require('../models/album.model');
const SongModel = require('../models/song.model');

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