const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const genusSchema = mongoose.Schema(
  {
    Ten_KH: {
      type: String,
      required: true,
      unique: true,
    },
    Ten_Latin: {
      type: String,
    },
    Ten_TV_Khac: {
      type: String,
    },
    Mo_Ta: {
      type: String,
    },
    Ho: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Familia',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
genusSchema.plugin(toJSON);
genusSchema.plugin(paginate);

/**
 * @typedef Genus
 */
const Genus = mongoose.model('Genus', genusSchema);

module.exports = Genus;
