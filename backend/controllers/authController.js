const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const logger = require('../helper/logger');
const { createJWT } = require('../utils/jwt');
const userLogin = require('../utils/login');

const login = async (req, res) => {
  const { userid, username, firstname, lastname, is_premium, inviter } = req.body;

  const loginRes = await userLogin(userid, username, firstname, lastname, is_premium, inviter);
  if(!loginRes.success) {
    return res.status(StatusCodes.BAD_REQUEST).json('Please provide userid');
  }

  res.status(StatusCodes.OK).json({ token: loginRes.token });
};

module.exports = {
  login,
};
