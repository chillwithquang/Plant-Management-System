const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createImage = {
  body: Joi.object().keys({
    URL: Joi.string().required(),
    speciesId: Joi.string().custom(objectId).required(),
  }),
};

const getImages = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteImage = {
  params: Joi.object().keys({
    imageId: Joi.string().custom(objectId),
  }),
};
const getImageByIdLoai = {
  params: Joi.object().keys({
    idLoai: Joi.string(),
  }),
};
module.exports = {
  createImage,
  getImages,
  deleteImage,
  getImageByIdLoai,
};
