const Joi = require('joi');

const createImage = {
  body: Joi.object().key({
    URL: Joi.string().required(),
  }),
};

module.exports = {
  createImage,
};
