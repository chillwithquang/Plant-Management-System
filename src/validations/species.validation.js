const Joi = require('joi');

const createSpecies = {
  body: Joi.object().key({
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
  }),
};

module.exports = {
  createSpecies,
};
