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

const eraseFamilia = catchAsync(async (req, res) => {
  await familiaService.eraseFamiliaById(req.params.familiaId, req.params.eraser);
  res.status(httpStatus.NO_CONTENT).send();
});

const restoreFamilia = catchAsync(async (req, res) => {
  await familiaService.restoreFamiliaById(req.params.familiaId);
  res.status(httpStatus.OK).send();
});

const getFamiliaByName = catchAsync(async (req, res) => {
  const familia = await familiaService.getFamiliaByName(req.params.familiaName);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  res.send(familia);
});

const suggestFamiliaName = catchAsync(async (req, res) => {
  const familia = await familiaService.suggestFamiliaName();
  const suggestion = [];
  for (let i = 0; i < familia.length; i += 1) {
    suggestion.push(familia[i].Ten_KH);
  }
  if (!suggestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  res.send(suggestion.filter((value) => value.includes(req.params.name)));
});
module.exports = {
  createFamilia,
  getFamilias,
  getFamilia,
  updateFamilia,
  deleteFamilia,
  eraseFamilia,
  restoreFamilia,
  getFamiliaByName,
  suggestFamiliaName,
};
