const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { plantService } = require('../services');

const createPlant = catchAsync(async (req, res) => {
  const plant = await plantService.createPlant(req.body);
  res.status(httpStatus.CREATED).send(plant);
});

const getPlants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await plantService.queryPlants(filter, options);
  res.send(result);
});

const getPlant = catchAsync(async (req, res) => {
  const plant = await plantService.getPlantById(req.params.plantId);
  if (!plant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plant not found');
  }
  res.send(plant);
});

const updatePlant = catchAsync(async (req, res) => {
  const user = await plantService.updatePlantById(req.params.plantId, req.body);
  res.send(user);
});

const deletePlant = catchAsync(async (req, res) => {
  await plantService.deletePlantById(req.params.plantId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPlant,
  getPlants,
  getPlant,
  updatePlant,
  deletePlant,
};
