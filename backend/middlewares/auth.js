const jwt = require('jsonwebtoken');

const { JWT_KEY = 'secret-key' } = process.env;
const InvalidCredentialsError = require('../errors/invalidCredentialsError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new InvalidCredentialsError('Необходимо авторизоваться.');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_KEY);
    } catch (err) {
      throw new InvalidCredentialsError('Необходимо авторизоваться.');
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
