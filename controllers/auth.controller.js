const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        res.status(200).json({ message: 'User logged in', data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const profile = async (req, res) => {
    try {
        res.status(200).json({ message: 'User profile', data: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login,
    profile,
}