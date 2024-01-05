const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Payment = require('./payment.model');

const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free',
    },
    renovationDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
});

Subscription.hasMany(Payment, {
    foreignKey: 'subscriptionId',
});

module.exports = Subscription;
