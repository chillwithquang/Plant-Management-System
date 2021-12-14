const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { genusService } = require('../services');

const createGenus = catchAsync(async (req, res) => {
  const genus = await genusService.createGenus(req.body);
  res.status(httpStatus.CREATED).send(genus);
});

const getGenuss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await genusService.queryGenuss(filter, options);
  res.send(result);
});

const getGenus = catchAsync(async (req, res) => {
  const genus = await genusService.getGenusById(req.params.genusId);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  res.send(genus);
});

const updateGenus = catchAsync(async (req, res) => {
  const user = await genusService.updateGenusById(req.params.genusId, req.body);
  res.send(user);
});

const deleteGenus = catchAsync(async (req, res) => {
  await genusService.deleteGenusById(req.params.genusId);
  res.status(httpStatus.NO_CONTENT).send();
});

const eraseGenus = catchAsync(async (req, res) => {
  await genusService.eraseGenusById(req.params.genusId, req.params.eraser);
  res.status(httpStatus.NO_CONTENT).send();
});

const restoreGenus = catchAsync(async (req, res) => {
  await genusService.restoreGenusById(req.params.genusId);
  res.status(httpStatus.OK).send();
});

const getGenusByName = catchAsync(async (req, res) => {
  const genus = await genusService.getGenusByName(req.params.genusName);
  if (!genus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genus not found');
  }
  res.send(genus);
});

const suggestGenusName = catchAsync(async (req, res) => {
  const genus = await genusService.suggestGenusName();
  const suggestion = [];
  for (let i = 0; i < genus.length; i += 1) {
    suggestion.push(genus[i].Ten_KH);
  }
  if (!suggestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'genus not found');
  }
  res.send(suggestion.filter((value) => value.includes(req.params.name)));
});
module.exports = {
  createGenus,
  getGenuss,
  getGenus,
  updateGenus,
  deleteGenus,
  eraseGenus,
  restoreGenus,
  getGenusByName,
  suggestGenusName,
};
