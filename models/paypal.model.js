const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const PayPal = sequelize.define('PayPal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = PayPal;
