const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const speciesSchema = mongoose.Schema(
  {
    ID_Loai: {
      type: Number,
      require: true,
      unique: true,
    },
    Ten_KH: {
      type: String,
    },
    Ten_TV_Khac: {
      type: String,
    },
    Ten_Latin: {
      type: String,
    },
    Ten_Latin_Khac: {
      type: String,
      required: true,
    },
    Dac_Diem_Nhan_Dang: {
      type: String,
    },
    Sinh_Hoc_Sinh_Thai: {
      type: String,
    },
    Phan_Bo: {
      type: String,
    },
    Gia_Tri: {
      type: String,
    },
    Tinh_Trang: {
      type: String,
    },
    Bien_Phap_BV: {
      type: String,
    },
    Danh_Song: {
      type: String,
    },
    Chi: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Genus',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
speciesSchema.plugin(toJSON);
speciesSchema.plugin(paginate);

/**
 * @typedef Species
 */
const Species = mongoose.model('Species', speciesSchema);

module.exports = Species;
