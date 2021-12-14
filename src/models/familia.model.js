const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const historise = require('mongoose-historise');
const { toJSON, paginate } = require('./plugins');

const familiaSchema = mongoose.Schema(
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
    idBo: {
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
familiaSchema.plugin(historise, { mongooseInstance: mongoose, mongooseModelName: 'Familia' });
familiaSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: ['countDocuments', 'find'],
});

// eslint-disable-next-line camelcase
familiaSchema.statics.isFamiliaTaken = async function (Ten_KH, excludeFamiliaId) {
  const familiaExist = await this.findOne({ Ten_KH, _id: { $ne: excludeFamiliaId } });
  return !!familiaExist;
};
/**
 * @typedef Familia
 */
const Familia = mongoose.model('Familia', familiaSchema);

module.exports = Familia;
