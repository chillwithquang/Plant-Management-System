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
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'deleted']);
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

const eraseSpecies = catchAsync(async (req, res) => {
  await speciesService.eraseSpeciesById(req.params.speciesId, req.params.eraser);
  res.status(httpStatus.NO_CONTENT).send();
});

const restoreSpecies = catchAsync(async (req, res) => {
  await speciesService.restoreSpeciesById(req.params.speciesId);
  res.status(httpStatus.OK).send();
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

const getParentSpecies = catchAsync(async (req, res) => {
  const parent = await speciesService.getParentSpecies(req.params.genusId);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species parent not found');
  }
  res.send(parent);
});

const getChildOfGenus = catchAsync(async (req, res) => {
  const children = await speciesService.getChildOfGenus(req.params.genusName);
  if (!children || !children.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus has no children');
  }
  const childrenName = [];
  const total = children.length;
  for (let i = 0; i < total; i += 1) {
    childrenName.push(children[i].Ten_KH);
  }
  const result = {
    total,
    children: [...new Set(childrenName)],
  };
  res.send(result);
});

const getHistorySpecies = catchAsync(async (req, res) => {
  const species = await speciesService.getSpeciesById(req.params.speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }
  const historise = species.history;
  for (let i = 0; i < historise.length; i += 1) {
    const modification = historise[i].modifications;
    for (let j = 0; j < modification.length; j += 1) {
      if (
        modification[j].field === 'deleted' ||
        modification[j].field === 'deletedAt' ||
        modification[j].field === 'deletedBy'
      ) {
        modification.splice(j, 1);
        j -= 1;
      }
    }
    if (modification.length === 0) {
      historise.splice(i, 1);
      i -= 1;
    }
  }
  res.send(historise);
});

module.exports = {
  createSpecies,
  getSpeciess,
  getSpecies,
  updateSpecies,
  deleteSpecies,
  eraseSpecies,
  restoreSpecies,
  getSpeciesByName,
  suggestSpeciesName,
  getParentSpecies,
  getChildOfGenus,
  getHistorySpecies,
};
