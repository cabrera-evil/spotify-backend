const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const PaymentModel = require('./payment.model');

const SubscriptionModel = sequelize.define('Subscription', {
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

SubscriptionModel.hasMany(PaymentModel, {
    foreignKey: 'subscriptionId',
    onDelete: 'CASCADE',
});

module.exports = SubscriptionModel;
