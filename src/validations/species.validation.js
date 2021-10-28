const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSpecies = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_TV_Khac: Joi.string(),
    Ten_Latin: Joi.string(),
    Ten_Latin_Khac: Joi.string(),
    Dac_Diem_Nhan_Dang: Joi.string(),
    Sinh_Hoc_Sinh_Thai: Joi.string(),
    Phan_Bo: Joi.string(),
    Gia_Tri: Joi.string(),
    Tinh_Trang: Joi.string(),
    Bien_Phap_BV: Joi.string(),
    Danh_Song: Joi.string(),
    genusId: Joi.string().custom(objectId).required(),
  }),
};

const getSpeciess = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSpecies = {
  params: Joi.object().keys({
    speciesId: Joi.string().custom(objectId),
  }),
};

const updateSpecies = {
  params: Joi.object().keys({
    speciesId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string().required(),
      Ten_TV_Khac: Joi.string(),
      Ten_Latin: Joi.string(),
      Ten_Latin_Khac: Joi.string(),
      Dac_Diem_Nhan_Dang: Joi.string(),
      Sinh_Hoc_Sinh_Thai: Joi.string(),
      Phan_Bo: Joi.string(),
      Gia_Tri: Joi.string(),
      Tinh_Trang: Joi.string(),
      Bien_Phap_BV: Joi.string(),
      Danh_Song: Joi.string(),
      genusId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteSpecies = {
  params: Joi.object().keys({
    speciesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSpecies,
  getSpeciess,
  getSpecies,
  updateSpecies,
  deleteSpecies,
};
