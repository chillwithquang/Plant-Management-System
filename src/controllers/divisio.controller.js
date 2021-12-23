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
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'deleted']);
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

const eraseDivisio = catchAsync(async (req, res) => {
  await divisioService.eraseDivisioById(req.params.divisioId, req.params.eraser);
  res.status(httpStatus.NO_CONTENT).send();
});

const restoreDivisio = catchAsync(async (req, res) => {
  await divisioService.restoreDivisioById(req.params.divisioId);
  res.status(httpStatus.OK).send();
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

const getHistoryDivisio = catchAsync(async (req, res) => {
  const divisio = await divisioService.getDivisioById(req.params.divisioId);
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }
  const historise = divisio.history;
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
  createDivisio,
  getDivisios,
  getDivisio,
  updateDivisio,
  deleteDivisio,
  eraseDivisio,
  restoreDivisio,
  getDivisioByName,
  suggestDivisioName,
  getHistoryDivisio,
};
