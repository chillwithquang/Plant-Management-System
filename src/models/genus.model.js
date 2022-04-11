const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const historise = require('mongoose-historise');
const { toJSON, paginate } = require('./plugins');

const genusSchema = mongoose.Schema(
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
    idHo: {
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
genusSchema.plugin(historise, { mongooseInstance: mongoose, mongooseModelName: 'Genus', limit: 3 });
genusSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: ['countDocuments', 'find'],
});
// eslint-disable-next-line camelcase
genusSchema.statics.isGenusTaken = async function (Ten_KH, excludeGenusId) {
  const genusExist = await this.findOne({ Ten_KH, _id: { $ne: excludeGenusId } });
  return !!genusExist;
};
/**
 * @typedef Genus
 */
const Genus = mongoose.model('Genus', genusSchema);

module.exports = Genus;
