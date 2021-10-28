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

module.exports = {
  createGenus,
  getGenuss,
  getGenus,
  updateGenus,
  deleteGenus,
};
