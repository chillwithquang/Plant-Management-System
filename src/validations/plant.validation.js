const Joi = require('joi');

const createPlant = {
  body: Joi.object().key({
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
    Vi_DO: Joi.string(),
  }),
};

module.exports = {
  createGenus: createPlant,
};
