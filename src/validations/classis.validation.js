const Joi = require('joi');

const createClassis = {
  body: Joi.object().key({
    Ten_KH: Joi.string().required(),
    Ten_Latin: Joi.string(),
    Mo_Ta: Joi.string(),
  }),
};

module.exports = {
  createClassis,
};
