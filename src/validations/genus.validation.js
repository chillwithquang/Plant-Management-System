const Joi = require('joi');

const createGenus = {
  body: Joi.object().key({
    Ten_KH: Joi.string().required(),
    Ten_Latin: Joi.string(),
    Ten_TV_Khac: Joi.string(),
    Mo_Ta: Joi.string(),
  }),
};

module.exports = {
  createGenus,
};
