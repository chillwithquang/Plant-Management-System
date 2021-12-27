const httpStatus = require('http-status');
const { Species } = require('../models');
const ApiError = require('../utils/ApiError');
const { getGenusById } = require('./genus.service');
const { getFamiliaById } = require('./familia.service');
const { getOrdoById } = require('./ordo.service');
const { getClassisById } = require('./classis.service');
const { getDivisioById } = require('./divisio.service');
const { getGenusByName } = require('./genus.service');

const createSpecies = async (data) => {
  if (await Species.isSpeciesTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Species already taken');
  }

  const genus = await getGenusById(data.idChi);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }

  const speciesDoc = Species.create({
    ...data,
    idChi: data.idChi,
  });

  return speciesDoc;
};

const querySpeciess = async (filter, options) => {
  const speciess = await Species.paginate(filter, options);
  return speciess;
};

const getSpeciesById = async (id) => {
  return Species.findById(id);
};

const updateSpeciesById = async (speciesId, updateBody) => {
  const species = await getSpeciesById(speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  if (updateBody.Ten_KH && (await Species.isSpeciesTaken(updateBody.Ten_KH, speciesId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Species already taken');
  }
  if (updateBody.idChi) {
    const genus = await getGenusById(updateBody.idChi);
    if (!genus) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
    }
  }
  Object.assign(species, updateBody);
  await species.save();
  return species;
};

const deleteSpeciesById = async (speciesId) => {
  const species = await getSpeciesById(speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  await species.remove();
  return species;
};

const eraseSpeciesById = async (speciesId, eraser) => {
  const species = await getSpeciesById(speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  await species.delete(eraser);
  return species;
};

const restoreSpeciesById = async (speciesId) => {
  const species = await getSpeciesById(speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  await species.restore();
  return species;
};

const getSpeciesByName = async (speciesName) => {
  return Species.find({ Ten_KH: speciesName });
};

const suggestSpeciesName = async () => {
  return Species.find({});
};

const getParentSpecies = async (genusId) => {
  const genus = (await getGenusById(genusId)).toJSON();
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'not not found abc');
  }
  const familia = (await getFamiliaById(genus.idHo)).toJSON();
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'not not found xyz');
  }
  const order = (await getOrdoById(familia.idBo)).toJSON();
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found a');
  }

  const classis = (await getClassisById(order.idLop)).toJSON();
  if (!classis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found a');
  }

  const divisio = (await getDivisioById(classis.idNganh)).toJSON();
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found a');
  }

  // const parent = [genus.Ten_KH, familia.Ten_KH, order.Ten_KH, classis.Ten_KH, divisio.Ten_KH];
  const parent = {
    genusName: genus.Ten_KH,
    familiaName: familia.Ten_KH,
    orderName: order.Ten_KH,
    classisName: classis.Ten_KH,
    divisioName: divisio.Ten_KH,
  };
  return parent;
};

const getChildOfGenus = async (genusName) => {
  const genus = await getGenusByName(genusName);
  if (!genus || !genus.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  const idGenus = genus[0].id;
  return Species.find({ idChi: idGenus });
};

const searchSpecies = async (speciesName) => {
  return Species.find({ Ten_KH: { $regex: speciesName } });
};

module.exports = {
  createSpecies,
  querySpeciess,
  getSpeciesById,
  updateSpeciesById,
  deleteSpeciesById,
  eraseSpeciesById,
  restoreSpeciesById,
  getSpeciesByName,
  suggestSpeciesName,
  getParentSpecies,
  getChildOfGenus,
  searchSpecies,
};
