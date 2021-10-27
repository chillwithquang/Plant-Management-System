const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classisSchema = mongoose.Schema(
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
classisSchema.plugin(toJSON);
classisSchema.plugin(paginate);

classisSchema.statics.isClassisTaken = async function (divisio, excludeClassisId) {
  const classiExist = await this.findOne({ divisio, _id: { $ne: excludeClassisId } });
  return !!classiExist;
};
/**
 * @typedef Classis
 */
const Classis = mongoose.model('Classis', classisSchema);

module.exports = Classis;
