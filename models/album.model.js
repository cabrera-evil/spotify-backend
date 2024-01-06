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
        defaultValue: '',
    },
});

AlbumModel.hasMany(SongModel, {
    foreignKey: 'albumId',
    onDelete: 'CASCADE',
});

module.exports = AlbumModel;