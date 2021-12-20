const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const historise = require('mongoose-historise');
const { toJSON, paginate } = require('./plugins');

const classisSchema = mongoose.Schema(
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
    idNganh: {
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
classisSchema.plugin(toJSON);
classisSchema.plugin(paginate);
classisSchema.plugin(historise, { mongooseInstance: mongoose, mongooseModelName: 'Classis', limit: 3 });
classisSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: ['countDocuments', 'find'],
});

// eslint-disable-next-line camelcase
classisSchema.statics.isClassisTaken = async function (Ten_KH, excludeClassisId) {
  const classiExist = await this.findOne({ Ten_KH, _id: { $ne: excludeClassisId } });
  return !!classiExist;
};
/**
 * @typedef Classis
 */
const Classis = mongoose.model('Classis', classisSchema);

module.exports = Classis;
