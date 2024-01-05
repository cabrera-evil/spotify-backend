const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    orderNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Payment;
