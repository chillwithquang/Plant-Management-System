const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ClassisSchema = mongoose.Schema(
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
    Nganh: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Divisio',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ClassisSchema.plugin(toJSON);
ClassisSchema.plugin(paginate);

/**
 * @typedef Classis
 */
const Classis = mongoose.model('Classis', ClassisSchema);

module.exports = Classis;
