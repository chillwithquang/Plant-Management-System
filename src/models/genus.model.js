const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const genusSchema = mongoose.Schema(
  {
    Ten_KH: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
genusSchema.plugin(toJSON);
genusSchema.plugin(paginate);

/**
 * @typedef User
 */
const Genus = mongoose.model('Genus', genusSchema);

module.exports = Genus;
