const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const plantSchema = mongoose.Schema(
  {
    Ten_KH: {
      type: String,
      required: true,
      unique: true,
    },
    Noi_Lay: {
      type: String,
    },
    Noi_Moc: {
      type: String,
    },
    So_Luong: {
      type: String,
    },
    Khu_Vuc_Sinh_Truong: {
      type: String,
      required: true,
    },
    Loai_Moc_Cung: {
      type: String,
    },
    Dac_Tinh_Sinh_Thai: {
      type: String,
    },
    Chieu_Cao: {
      type: String,
    },
    Duong_Kinh: {
      type: String,
    },
    Kinh_Do: {
      type: String,
    },
    Vi_Do: {
      type: String,
    },
    Loai: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Species',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
plantSchema.plugin(toJSON);
plantSchema.plugin(paginate);

// eslint-disable-next-line camelcase
plantSchema.statics.isPlantTaken = async function (Ten_KH, excludePlantId) {
  const plantExist = await this.findOne({ Ten_KH, _id: { $ne: excludePlantId } });
  return !!plantExist;
};
/**
 * @typedef Plant
 */
const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
