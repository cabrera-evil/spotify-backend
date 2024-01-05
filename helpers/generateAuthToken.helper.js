const jwt = require('jsonwebtoken');

const generateAuthToken = async (user) => {
    try {
        const payload = {
            _id: user._id,
        };
        const options = {
            expiresIn: process.env.JWT_EXPIRATION || '1h',
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = generateAuthToken;
