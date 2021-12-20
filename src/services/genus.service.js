const httpStatus = require('http-status');
const { Genus } = require('../models');
const ApiError = require('../utils/ApiError');
const { getFamiliaById } = require('./familia.service');
const { getFamiliaByName } = require('./familia.service');

const createGenus = async (data) => {
  if (await Genus.isGenusTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Genus already taken');
  }

  const familia = await getFamiliaById(data.idHo);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }

  const genusDoc = Genus.create({
    ...data,
    idHo: data.idHo,
  });

  return genusDoc;
};

const queryGenuss = async (filter, options) => {
  const genuss = await Genus.paginate(filter, options);
  return genuss;
};

const getGenusById = async (id) => {
  return Genus.findById(id);
};

const updateGenusById = async (genusId, updateBody) => {
  const genus = await getGenusById(genusId);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  if (updateBody.Ten_KH && (await Genus.isGenusTaken(updateBody.Ten_KH, genusId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Genus already taken');
  }
  if (updateBody.idHo) {
    const familia = await getFamiliaById(updateBody.idHo);
    if (!familia) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
    }
  }
  Object.assign(genus, updateBody);
  await genus.save();
  return genus;
};

const deleteGenusById = async (genusId) => {
  const genus = await getGenusById(genusId);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  await genus.remove();
  return genus;
};

const eraseGenusById = async (genusId, eraser) => {
  const genus = await getGenusById(genusId);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  await genus.delete(eraser);
  return genus;
};

const restoreGenusById = async (genusId) => {
  const genus = await getGenusById(genusId);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  await genus.restore();
  return genus;
};

const getGenusByName = async (genusName) => {
  return Genus.find({ Ten_KH: genusName });
};

const suggestGenusName = async () => {
  return Genus.find({});
};

const getChildOfFamilia = async (familiaName) => {
  const familia = await getFamiliaByName(familiaName);
  if (!familia || !familia.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  const idFamilia = familia[0].id;
  return Genus.find({ idHo: idFamilia });
};

module.exports = {
  createGenus,
  queryGenuss,
  getGenusById,
  updateGenusById,
  deleteGenusById,
  eraseGenusById,
  restoreGenusById,
  getGenusByName,
  suggestGenusName,
  getChildOfFamilia,
};
