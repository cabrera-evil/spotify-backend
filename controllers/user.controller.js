const userService = require('../services/user.service');

const createUser = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({ message: 'User created', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({ message: 'Users retrieved', data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json({ message: 'User retrieved', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'User updated', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}