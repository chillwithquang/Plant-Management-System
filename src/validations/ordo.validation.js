const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrdo = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_TV: Joi.string(),
    Mo_Ta: Joi.string(),
    idLop: Joi.string().custom(objectId).required(),
  }),
};

const getOrdos = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    deleted: Joi.number().integer(),
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
      Ten_TV: Joi.string(),
      Mo_Ta: Joi.string(),
      idLop: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteOrdo = {
  params: Joi.object().keys({
    ordoId: Joi.string().custom(objectId),
  }),
};

const eraseOrdoById = {
  params: Joi.object().keys({
    ordoId: Joi.string().custom(objectId),
    eraser: Joi.string(),
  }),
};

const restoreOrdo = {
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

const getChildOfClassis = {
  params: Joi.object().keys({
    classisName: Joi.string(),
  }),
};

const searchOrder = {
  params: Joi.object().keys({
    orderName: Joi.string(),
  }),
};

module.exports = {
  createOrdo,
  getOrdos,
  getOrdo,
  updateOrdo,
  deleteOrdo,
  eraseOrdoById,
  restoreOrdo,
  getOrderByName,
  suggestOrderName,
  getChildOfClassis,
  searchOrder,
};
