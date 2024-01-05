const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const SongModel = sequelize.define('Song', {
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
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = SongModel;