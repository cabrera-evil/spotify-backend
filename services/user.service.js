const UserModel = require('../models/user.model');
const CreditCardModel = require('../models/creditCard.model');
const PaypalModel = require('../models/paypal.model');
const SubscriptionModel = require('../models/subscription.model');
const hashPassword = require('../helpers/hashPassword.helper');

/**
 * @description Create a new user
 * @param {Object} user
 * @returns {Object} User created
 */
const createUser = async (user) => {
    try {
        user.password = await hashPassword(user.password);
        const newUser = await UserModel.create(user);
        await SubscriptionModel.create({
            userId: newUser.id,
        });
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Get all users
 * @returns {Array} Users
 */
const getUsers = async () => {
    try {
        const users = await UserModel.findAll({
            attributes: ['id', 'username', 'email'],
            include: [
                {
                    model: CreditCardModel,
                    attributes: ['id', 'cardNumber', 'expirationMonth', 'expirationYear'],
                },
                {
                    model: PaypalModel,
                    attributes: ['id', 'username'],
                },
                {
                    model: SubscriptionModel,
                    attributes: ['id', 'name', 'renovationDate'],
                },
            ],
        });
        if (!users) throw new Error('Users not found');
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Get a user
 * @param {Number} id
 * @returns {Object} User
 */
const getUser = async (id) => {
    try {
        const user = await UserModel.findByPk(id, {
            include: [
                { model: CreditCardModel },
                { model: PaypalModel },
                { model: SubscriptionModel },
            ],
        });
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @description Update a user
 * @param {Number} id
 * @param {Object} user
 * @returns {Object} User updated
 */
const updateUser = async (id, user) => {
    try {
        const [rowsUpdated, [updatedUser]] = await UserModel.update(user, {
            where: { id: id },
            returning: true,
        });
        if (rowsUpdated === 0) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @description Delete a user
 * @param {Number} id
 * @returns {Object} User deleted
 */
const deleteUser = async (id) => {
    try {
        const [rowsUpdated, [deletedUser]] = await UserModel.update(
            { status: false },
            {
                where: { id: id },
                returning: true,
            }
        );
        if (rowsUpdated === 0) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}