const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ordoSchema = mongoose.Schema(
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
    Lop: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Classis',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ordoSchema.plugin(toJSON);
ordoSchema.plugin(paginate);

/**
 * @typedef Ordo
 */
const Ordo = mongoose.model('Ordo', ordoSchema);

module.exports = Ordo;
