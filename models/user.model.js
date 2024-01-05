const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const CreditCard = require('./creditCard.model');
const Paypal = require('./paypal.model');
const Subscription = require('./subscription.model');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

User.hasMany(CreditCard, {
    foreignKey: 'userId'
});
User.hasMany(Paypal, {
    foreignKey: 'userId'
});
User.hasOne(Subscription, {
    foreignKey: 'userId'
});

module.exports = User;
