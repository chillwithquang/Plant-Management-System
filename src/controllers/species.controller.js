const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { speciesService } = require('../services');

const createSpecies = catchAsync(async (req, res) => {
  const species = await speciesService.createSpecies(req.body);
  res.status(httpStatus.CREATED).send(species);
});

const getSpeciess = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await speciesService.querySpeciess(filter, options);
  res.send(result);
});

const getSpecies = catchAsync(async (req, res) => {
  const species = await speciesService.getSpeciesById(req.params.speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  res.send(species);
});

const updateSpecies = catchAsync(async (req, res) => {
  const user = await speciesService.updateSpeciesById(req.params.speciesId, req.body);
  res.send(user);
});

const deleteSpecies = catchAsync(async (req, res) => {
  await speciesService.deleteSpeciesById(req.params.speciesId);
  res.status(httpStatus.NO_CONTENT).send();
});
const getSpeciesByName = catchAsync(async (req, res) => {
  const species = await speciesService.getSpeciesByName(req.params.speciesName);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  res.send(species);
});

const suggestSpeciesName = catchAsync(async (req, res) => {
  const species = await speciesService.suggestSpeciesName();
  const suggestion = [];
  for (let i = 0; i < species.length; i += 1) {
    suggestion.push(species[i].Ten_KH);
  }
  if (!suggestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  res.send(suggestion.filter((value) => value.includes(req.params.name)));
});
module.exports = {
  createSpecies,
  getSpeciess,
  getSpecies,
  updateSpecies,
  deleteSpecies,
  getSpeciesByName,
  suggestSpeciesName,
};
