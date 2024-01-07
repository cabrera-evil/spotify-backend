const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const SongModel = require('./song.model');

const AlbumModel = sequelize.define('Album', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/cabrera-evil/image/upload/v1704667562/spotify/albums/no-album-cover.jpg',
    },
});

AlbumModel.hasMany(SongModel, {
    foreignKey: 'albumId',
    onDelete: 'CASCADE',
});

module.exports = AlbumModel;