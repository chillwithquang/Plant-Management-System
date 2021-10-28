const httpStatus = require('http-status');
const { Species } = require('../models');
const ApiError = require('../utils/ApiError');
const { getGenusById } = require('./genus.service');

const createSpecies = async (data) => {
  if (await Species.isSpeciesTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Species already taken');
  }

  const genus = await getGenusById(data.genusId);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }

  const speciesDoc = Species.create({
    ...data,
    Chi: data.genusId,
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
  if (updateBody.genusId) {
    const genus = await getGenusById(updateBody.genusId);
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

module.exports = {
  createSpecies,
  querySpeciess,
  getSpeciesById,
  updateSpeciesById,
  deleteSpeciesById,
};
