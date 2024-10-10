const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
};

module.exports = {
    createJWT,
};