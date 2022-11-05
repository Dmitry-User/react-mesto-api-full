const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../utils/constants');

const verifyLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const verifyUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEX),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const verifyUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
});

const verifyUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const verifyAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REGEX),
  }),
});

module.exports = {
  verifyLogin,
  verifyUserCreate,
  verifyUserId,
  verifyUserUpdate,
  verifyAvatar,
};
