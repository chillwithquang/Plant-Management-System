const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGenus = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_Tv: Joi.string(),
    Mo_Ta: Joi.string(),
    idHo: Joi.string().custom(objectId).required(),
  }),
};

const getGenuss = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGenus = {
  params: Joi.object().keys({
    genusId: Joi.string().custom(objectId),
  }),
};

const updateGenus = {
  params: Joi.object().keys({
    genusId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string(),
      Ten_TV: Joi.string(),
      Mo_Ta: Joi.string(),
      idHo: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteGenus = {
  params: Joi.object().keys({
    genusId: Joi.string().custom(objectId),
  }),
};
const getGenusByName = {
  params: Joi.object().keys({
    genusName: Joi.string(),
  }),
};

const suggestGenusName = {
  params: Joi.object().keys({
    name: Joi.string(),
  }),
};
module.exports = {
  createGenus,
  getGenuss,
  getGenus,
  updateGenus,
  deleteGenus,
  getGenusByName,
  suggestGenusName,
};
