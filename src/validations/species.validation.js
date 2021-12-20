const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSpecies = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_TV: Joi.string(),
    Dac_Diem_Nhan_Dang: Joi.string().optional().allow(''),
    Sinh_Hoc_Sinh_Thai: Joi.string().optional().allow(''),
    Phan_Bo: Joi.string().optional().allow(''),
    Gia_Tri: Joi.string().optional().allow(''),
    Tinh_Trang: Joi.string().optional().allow(''),
    Bien_Phap_BV: Joi.string().optional().allow(''),
    Dang_Song: Joi.string().optional().allow(''),
    idChi: Joi.string().custom(objectId).required(),
  }),
};

const getSpeciess = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    deleted: Joi.number().integer(),
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
      Ten_TV: Joi.string(),
      Dac_Diem_Nhan_Dang: Joi.string(),
      Sinh_Hoc_Sinh_Thai: Joi.string(),
      Phan_Bo: Joi.string(),
      Gia_Tri: Joi.string(),
      Tinh_Trang: Joi.string(),
      Bien_Phap_BV: Joi.string(),
      Dang_Song: Joi.string(),
      idChi: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteSpecies = {
  params: Joi.object().keys({
    speciesId: Joi.string().custom(objectId),
  }),
};

const eraseSpeciesById = {
  params: Joi.object().keys({
    speciesId: Joi.string().custom(objectId),
    eraser: Joi.string(),
  }),
};

const restoreSpecies = {
  params: Joi.object().keys({
    speciesId: Joi.string().custom(objectId),
  }),
};

const getSpeciesByName = {
  params: Joi.object().keys({
    speciesName: Joi.string(),
  }),
};

const suggestSpeciesName = {
  params: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getParentSpecies = {
  params: Joi.object().keys({
    genusId: Joi.string().custom(objectId),
  }),
};

const getChildOfGenus = {
  params: Joi.object().keys({
    genusName: Joi.string(),
  }),
};

module.exports = {
  createSpecies,
  getSpeciess,
  getSpecies,
  updateSpecies,
  deleteSpecies,
  eraseSpeciesById,
  restoreSpecies,
  getSpeciesByName,
  suggestSpeciesName,
  getParentSpecies,
  getChildOfGenus,
};
