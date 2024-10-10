const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = async (request, response, next) => {
  const token = request.headers.authorization && request.headers.authorization.split(' ')[1];
  try {
    if (!token) {
      return response.status(400).json({
        message: 'Token not provided',
      })
    }
    else {
      const auth = jwt.verify(token, process.env.JWT_SECRET)
      if (!auth) {
        return response.status(401).json({
          message: 'Unauthorized - invalid token',
        })
      }

      request.auth = auth
      request.body.userid = auth.userid
      next()
    }
  } catch (error) {
    console.error('Error occured here: ', error);
    console.log("authentication error token=", token);
    console.log("authentication error route=", request.originalUrl);
    return response.status(401).json({
      message: 'Unauthorized - invalid token',
    })
  }
}
module.exports = {
  authenticateUser,
};