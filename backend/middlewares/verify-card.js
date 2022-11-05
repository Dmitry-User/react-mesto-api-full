const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../utils/constants');

const verifyCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REGEX),
  }),
});

const verifyCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
});

module.exports = {
  verifyCard,
  verifyCardId,
};
