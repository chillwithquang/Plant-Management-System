const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const historise = require('mongoose-historise');
const { toJSON, paginate } = require('./plugins');

const ordoSchema = mongoose.Schema(
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
    idLop: {
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
ordoSchema.plugin(historise, { mongooseInstance: mongoose, mongooseModelName: 'Ordo' });
ordoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: ['countDocuments', 'find'],
});

// eslint-disable-next-line camelcase
ordoSchema.statics.isOrdoTaken = async function (Ten_KH, excludeOrdoId) {
  const ordoExist = await this.findOne({ Ten_KH, _id: { $ne: excludeOrdoId } });
  return !!ordoExist;
};
/**
 * @typedef Ordo
 */
const Ordo = mongoose.model('Ordo', ordoSchema);

module.exports = Ordo;
