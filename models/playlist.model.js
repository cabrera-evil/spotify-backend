const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const SongModel = require('./song.model');

const PlaylistModel = sequelize.define('Playlist', {
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
    songCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
});

PlaylistModel.belongsToMany(SongModel, {
    through: 'PlaylistSongs'
});

module.exports = PlaylistModel;