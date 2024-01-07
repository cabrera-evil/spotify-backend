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
        defaultValue: 'https://res.cloudinary.com/cabrera-evil/image/upload/v1704667712/spotify/artists/no-profile-picture.png',
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