const httpStatus = require('http-status');
const { Familia } = require('../models');
const ApiError = require('../utils/ApiError');
const { getOrdoById } = require('./ordo.service');
const { getOrderByName } = require('./ordo.service');

async function createFamilia(data) {
  if (await Familia.isFamiliaTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Familia already taken');
  }

  const ordo = await getOrdoById(data.idBo);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }

  const familiaDoc = Familia.create({
    ...data,
    idBo: data.idBo,
  });

  return familiaDoc;
}

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
  if (updateBody.idBo) {
    const ordo = await getOrdoById(updateBody.idBo);
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

const eraseFamiliaById = async (familiaId, eraser) => {
  const familia = await getFamiliaById(familiaId);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'familia not found');
  }
  await familia.delete(eraser);
  return familia;
};

const restoreFamiliaById = async (familiaId) => {
  const familia = await getFamiliaById(familiaId);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'familia not found');
  }
  await familia.restore();
  return familia;
};

const getFamiliaByName = async (familiaName) => {
  return Familia.find({ Ten_KH: familiaName });
};

const suggestFamiliaName = async () => {
  return Familia.find({});
};

const getChildOfOrdo = async (ordoName) => {
  const ordo = await getOrderByName(ordoName);
  if (!ordo || !ordo.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }
  const idOrdo = ordo[0].id;
  return Familia.find({ idBo: idOrdo });
};

module.exports = {
  createFamilia,
  queryFamilias,
  getFamiliaById,
  updateFamiliaById,
  deleteFamiliaById,
  eraseFamiliaById,
  restoreFamiliaById,
  getFamiliaByName,
  suggestFamiliaName,
  getChildOfOrdo,
};
