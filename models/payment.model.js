const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const PaymentModel = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

module.exports = PaymentModel;
