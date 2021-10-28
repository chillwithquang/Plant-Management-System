const httpStatus = require('http-status');
const { Plant } = require('../models');
const ApiError = require('../utils/ApiError');
const { getSpeciesById } = require('./species.service');

const createPlant = async (data) => {
  if (await Plant.isPlantTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plant already taken');
  }

  const species = await getSpeciesById(data.speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }

  const plantDoc = Plant.create({
    ...data,
    Loai: data.speciesId,
  });

  return plantDoc;
};

const queryPlants = async (filter, options) => {
  const plants = await Plant.paginate(filter, options);
  return plants;
};

const getPlantById = async (id) => {
  return Plant.findById(id);
};

const updatePlantById = async (plantId, updateBody) => {
  const plant = await getPlantById(plantId);
  if (!plant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plant not found');
  }
  if (updateBody.Ten_KH && (await Plant.isPlantTaken(updateBody.Ten_KH, plantId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plant already taken');
  }
  if (updateBody.speciesId) {
    const species = await getSpeciesById(updateBody.speciesId);
    if (!species) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
    }
  }
  Object.assign(plant, updateBody);
  await plant.save();
  return plant;
};

const deletePlantById = async (plantId) => {
  const plant = await getPlantById(plantId);
  if (!plant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plant not found');
  }
  await plant.remove();
  return plant;
};

module.exports = {
  createPlant,
  queryPlants,
  getPlantById,
  updatePlantById,
  deletePlantById,
};
