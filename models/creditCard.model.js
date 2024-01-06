const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const CreditCardModel = sequelize.define('CreditCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expirationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = CreditCardModel;
