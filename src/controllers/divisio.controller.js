const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { divisioService } = require('../services');

const createDivisio = catchAsync(async (req, res) => {
  const divisio = await divisioService.createDivisio(req.body);
  res.status(httpStatus.CREATED).send(divisio);
});

const getDivisios = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await divisioService.queryDivisios(filter, options);
  res.send(result);
});

const getDivisio = catchAsync(async (req, res) => {
  const divisio = await divisioService.getDivisioById(req.params.divisioId);
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }
  res.send(divisio);
});

const updateDivisio = catchAsync(async (req, res) => {
  const user = await divisioService.updateDivisioById(req.params.divisioId, req.body);
  res.send(user);
});

const deleteDivisio = catchAsync(async (req, res) => {
  await divisioService.deleteDivisioById(req.params.divisioId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDivisioByName = catchAsync(async (req, res) => {
  const divisio = await divisioService.getDivisioByName(req.params.divisioName);
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }
  res.send(divisio);
});

const suggestDivisioName = catchAsync(async (req, res) => {
  const divisios = await divisioService.suggestDivisioName();
  const suggestion = [];
  for (let i = 0; i < divisios.length; i += 1) {
    suggestion.push(divisios[i].Ten_KH);
  }
  if (!suggestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }
  res.send(suggestion.filter((value) => value.includes(req.params.name)));
});

module.exports = {
  createDivisio,
  getDivisios,
  getDivisio,
  updateDivisio,
  deleteDivisio,
  getDivisioByName,
  suggestDivisioName,
};
