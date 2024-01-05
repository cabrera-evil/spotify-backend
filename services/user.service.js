const UserModel = require('../models/user.model');
const hashPassword = require('../helpers/hashPassword.helper');

const createUser = async (user) => {
    try {
        const hashedPassword = await hashPassword(user.password);
        const newUser = await UserModel.create({
            ...user,
            password: hashedPassword
        });
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUsers = async () => {
    try {
        const users = await UserModel.findAll();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUser = async (id) => {
    try {
        const user = await UserModel.findByPk(id);
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

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

const deleteUser = async (id) => {
    try {
        const [rowsUpdated, [deletedUser]] = await UserModel.update(
            { active: false },
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