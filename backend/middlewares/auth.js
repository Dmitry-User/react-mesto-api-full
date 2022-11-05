const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
