const UserModel = require('../models/user.model');

const validateRole = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const user = await UserModel.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            if (!requiredRoles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
            next();
        } catch (error) {
            console.error('Error validating role:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = validateRole;
