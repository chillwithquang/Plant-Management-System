const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    URL: {
      type: String,
      required: true,
      unique: true,
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
imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);

/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
