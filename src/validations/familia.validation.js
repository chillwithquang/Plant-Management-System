const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFamilia = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_Latin: Joi.string(),
    Mo_Ta: Joi.string(),
    ordoId: Joi.string().custom(objectId).required(),
  }),
};

const getFamilias = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.string().custom(objectId),
  }),
};

const updateFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string(),
      Ten_Latin: Joi.string(),
      Mo_Ta: Joi.string(),
      ordoId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFamilia,
  getFamilias,
  getFamilia,
  updateFamilia,
  deleteFamilia,
};
