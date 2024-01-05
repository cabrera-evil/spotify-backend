const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const AlbumModel = require('./album.model');

const ArtistModel = sequelize.define('Artist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

ArtistModel.hasMany(AlbumModel, {
    foreignKey: 'artistId'
});

module.exports = ArtistModel;