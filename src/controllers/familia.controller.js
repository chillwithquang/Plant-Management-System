const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { familiaService } = require('../services');

const createFamilia = catchAsync(async (req, res) => {
  const familia = await familiaService.createFamilia(req.body);
  res.status(httpStatus.CREATED).send(familia);
});

const getFamilias = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await familiaService.queryFamilias(filter, options);
  res.send(result);
});

const getFamilia = catchAsync(async (req, res) => {
  const familia = await familiaService.getFamiliaById(req.params.familiaId);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  res.send(familia);
});

const updateFamilia = catchAsync(async (req, res) => {
  const user = await familiaService.updateFamiliaById(req.params.familiaId, req.body);
  res.send(user);
});

const deleteFamilia = catchAsync(async (req, res) => {
  await familiaService.deleteFamiliaById(req.params.familiaId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFamilia,
  getFamilias,
  getFamilia,
  updateFamilia,
  deleteFamilia,
};
