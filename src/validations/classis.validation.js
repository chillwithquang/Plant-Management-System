const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClassis = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_Latin: Joi.string(),
    Mo_Ta: Joi.string(),
    divisioId: Joi.string().custom(objectId).required(),
  }),
};

const getClassiss = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getClassis = {
  params: Joi.object().keys({
    classisId: Joi.string().custom(objectId),
  }),
};

const updateClassis = {
  params: Joi.object().keys({
    classisId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string(),
      Ten_Latin: Joi.string(),
      Mo_Ta: Joi.string(),
      divisioId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteClassis = {
  params: Joi.object().keys({
    classisId: Joi.string().custom(objectId),
  }),
};

const getClassisByName = {
  params: Joi.object().keys({
    classisName: Joi.string(),
  }),
};

const suggestClassisName = {
  params: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  createClassis,
  getClassiss,
  getClassis,
  updateClassis,
  deleteClassis,
  getClassisByName,
  suggestClassisName,
};
