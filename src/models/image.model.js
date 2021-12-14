const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    URL: {
      type: String,
      required: true,
      unique: true,
    },
    idLoai: {
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
imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);

// eslint-disable-next-line camelcase
imageSchema.statics.isImageTaken = async function (URL, excludeImageId) {
  const imageExist = await this.findOne({ URL, _id: { $ne: excludeImageId } });
  return !!imageExist;
};
/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
