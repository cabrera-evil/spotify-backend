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
        unique: true,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

ArtistModel.hasMany(AlbumModel, {
    foreignKey: 'artistId',
    onDelete: 'CASCADE',
});

module.exports = ArtistModel;