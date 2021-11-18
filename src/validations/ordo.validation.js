const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrdo = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_Latin: Joi.string(),
    Mo_Ta: Joi.string(),
    classisId: Joi.string().custom(objectId).required(),
  }),
};

const getOrdos = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrdo = {
  params: Joi.object().keys({
    ordoId: Joi.string().custom(objectId),
  }),
};

const updateOrdo = {
  params: Joi.object().keys({
    ordoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string(),
      Ten_Latin: Joi.string(),
      Mo_Ta: Joi.string(),
      classisId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteOrdo = {
  params: Joi.object().keys({
    ordoId: Joi.string().custom(objectId),
  }),
};
const getOrderByName = {
  params: Joi.object().keys({
    orderName: Joi.string(),
  }),
};

const suggestOrderName = {
  params: Joi.object().keys({
    name: Joi.string(),
  }),
};
module.exports = {
  createOrdo,
  getOrdos,
  getOrdo,
  updateOrdo,
  deleteOrdo,
  getOrderByName,
  suggestOrderName,
};
