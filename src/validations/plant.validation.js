const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPlant = {
  body: Joi.object().keys({
    Ten_Cay: Joi.string().required(),
    Noi_Lay: Joi.string(),
    Noi_Moc: Joi.string(),
    So_Luong: Joi.string(),
    Khu_Vuc_Sinh_Truong: Joi.string(),
    Loai_Moc_Cung: Joi.string(),
    Dac_Tinh_Sinh_Thai: Joi.string(),
    Chieu_Cao: Joi.string(),
    Duong_Kinh: Joi.string(),
    Kinh_Do: Joi.string(),
    Vi_Do: Joi.string(),
    speciesId: Joi.string().custom(objectId).required(),
  }),
};

const getPlants = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPlant = {
  params: Joi.object().keys({
    plantId: Joi.string().custom(objectId),
  }),
};

const updatePlant = {
  params: Joi.object().keys({
    plantId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_Cay: Joi.string().required(),
      Noi_Lay: Joi.string(),
      Noi_Moc: Joi.string(),
      So_Luong: Joi.string(),
      Khu_Vuc_Sinh_Truong: Joi.string(),
      Loai_Moc_Cung: Joi.string(),
      Dac_Tinh_Sinh_Thai: Joi.string(),
      Chieu_Cao: Joi.string(),
      Duong_Kinh: Joi.string(),
      Kinh_Do: Joi.string(),
      Vi_Do: Joi.string(),
      speciesId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deletePlant = {
  params: Joi.object().keys({
    plantId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPlant,
  getPlants,
  getPlant,
  updatePlant,
  deletePlant,
};
