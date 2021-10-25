const Joi = require('joi');

const createDivisio = {
  body: Joi.object().key({
    Ten_KH: Joi.string().required(),
    Ten_Latin: Joi.string(),
    Mo_Ta: Joi.string(),
  }),
};

const getDivisios = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createDivisio,
  getDivisios,
};
