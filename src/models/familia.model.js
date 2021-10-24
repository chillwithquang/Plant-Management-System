const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const familiaSchema = mongoose.Schema(
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
      ref: 'Ordo',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
familiaSchema.plugin(toJSON);
familiaSchema.plugin(paginate);

/**
 * @typedef Familia
 */
const Familia = mongoose.model('Familia', familiaSchema);

module.exports = Familia;
