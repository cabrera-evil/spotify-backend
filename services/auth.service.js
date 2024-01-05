const UserModel = require('../models/user.model');
const SubscriptionModel = require('../models/subscription.model');
const hashPassword = require('../helpers/hashPassword.helper');
const verifyPassword = require('../helpers/verifyPassword.helper');
const generateAuthToken = require('../helpers/generateAuthToken.helper');

/**
 * @description Create a new user
 * @param {Object} user
 * @returns {Object} User created
 */
const register = async (user) => {
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
 * @description Login a user
 * @param {Object} User
 * @returns {Object} User logged in and token
 */
const login = async (user) => {
    try {
        const foundUser = await UserModel.findOne({
            where: {
                username: user.username,
            },
        });
        if (!foundUser) throw new Error('User not found');
        const isMatch = await verifyPassword(user.password, foundUser.password);
        if (!isMatch) throw new Error('Wrong password');
        const token = await generateAuthToken(foundUser);
        return {
            user: foundUser,
            token,
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    register,
    login,
}