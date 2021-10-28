const httpStatus = require('http-status');
const { Familia } = require('../models');
const ApiError = require('../utils/ApiError');
const { getOrdoById } = require('./ordo.service');

const createFamilia = async (data) => {
  if (await Familia.isFamiliaTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Familia already taken');
  }

  const ordo = await getOrdoById(data.ordoId);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }

  const familiaDoc = Familia.create({
    ...data,
    Bo: data.ordoId,
  });

  return familiaDoc;
};

const queryFamilias = async (filter, options) => {
  const familias = await Familia.paginate(filter, options);
  return familias;
};

const getFamiliaById = async (id) => {
  return Familia.findById(id);
};

const updateFamiliaById = async (familiaId, updateBody) => {
  const familia = await getFamiliaById(familiaId);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  if (updateBody.Ten_KH && (await Familia.isFamiliaTaken(updateBody.Ten_KH, familiaId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Familia already taken');
  }
  if (updateBody.ordoId) {
    const ordo = await getOrdoById(updateBody.ordoId);
    if (!ordo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
    }
  }
  Object.assign(familia, updateBody);
  await familia.save();
  return familia;
};

const deleteFamiliaById = async (familiaId) => {
  const familia = await getFamiliaById(familiaId);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  await familia.remove();
  return familia;
};

module.exports = {
  createFamilia,
  queryFamilias,
  getFamiliaById,
  updateFamiliaById,
  deleteFamiliaById,
};
