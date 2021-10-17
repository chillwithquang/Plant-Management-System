const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ImageSchema = mongoose.Schema(
  {
    URL: {
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
ImageSchema.plugin(toJSON);
ImageSchema.plugin(paginate);

/**
 * @typedef Image
 */
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
