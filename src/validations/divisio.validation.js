const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDivisio = {
  body: Joi.object().keys({
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

const getDivisio = {
  params: Joi.object().keys({
    divisioId: Joi.string().custom(objectId),
  }),
};

const updateDivisioId = {
  params: Joi.object().keys({
    divisioId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string(),
      Ten_Latin: Joi.string(),
      Mo_Ta: Joi.string(),
    })
    .min(1),
};

const deleteDivisioById = {
  params: Joi.object().keys({
    divisioId: Joi.string().custom(objectId),
  }),
};

const getDivisioByName = {
  params: Joi.object().keys({
    divisioName: Joi.string(),
  }),
};

const suggestDivisioName = {
  params: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  createDivisio,
  getDivisios,
  getDivisio,
  updateDivisioId,
  deleteDivisioById,
  getDivisioByName,
  suggestDivisioName,
};
