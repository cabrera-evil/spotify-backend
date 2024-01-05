const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const CreditCard = require('./creditCard.model');
const PaypalModel = require('./paypal.model');
const SubscriptionModel = require('./subscription.model');
const PlaylistModel = require('./playlist.model');

const UserModel = sequelize.define('User', {
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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

UserModel.hasMany(CreditCard, {
    foreignKey: 'userId'
});
UserModel.hasMany(PaypalModel, {
    foreignKey: 'userId'
});
UserModel.hasOne(SubscriptionModel, {
    foreignKey: 'userId'
});

UserModel.hasOne(PlaylistModel, {
    foreignKey: 'userId'
});

module.exports = UserModel;
