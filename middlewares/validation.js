const { Joi, celebrate } = require("celebrate");
const validator = require("validator");


const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");

};

const validateItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().required().custom(validateURL),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});


const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});


const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateItemBody,
  validateUserBody,
  validateAuthentication,
  validateId,
};