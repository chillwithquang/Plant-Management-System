const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const DivisioSchema = mongoose.Schema(
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
DivisioSchema.plugin(toJSON);
DivisioSchema.plugin(paginate);

/**
 * @typedef Divisio
 */
const Divisio = mongoose.model('Divisio', DivisioSchema);

module.exports = Divisio;
