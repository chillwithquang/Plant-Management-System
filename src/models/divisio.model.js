const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const historise = require('mongoose-historise');
const { toJSON, paginate } = require('./plugins');

const divisioSchema = mongoose.Schema(
  {
    Ten_KH: {
      type: String,
      required: true,
      unique: true,
    },
    Ten_TV: {
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
divisioSchema.plugin(toJSON);
divisioSchema.plugin(paginate);
divisioSchema.plugin(historise, { mongooseInstance: mongoose, mongooseModelName: 'Divisio' });
divisioSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: ['countDocuments', 'find'],
});

// eslint-disable-next-line camelcase
divisioSchema.statics.isDivisioTaken = async function (Ten_KH, excludeDivisioId) {
  const divisioExist = await this.findOne({ Ten_KH, _id: { $ne: excludeDivisioId } });
  return !!divisioExist;
};
/**
 * @typedef Divisio
 */
const Divisio = mongoose.model('Divisio', divisioSchema);

module.exports = Divisio;
