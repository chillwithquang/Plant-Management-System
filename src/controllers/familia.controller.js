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
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'deleted']);
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

const getChildOfOrdo = catchAsync(async (req, res) => {
  const children = await familiaService.getChildOfOrdo(req.params.ordoName);
  if (!children || !children.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo has no children');
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

const getHistoryFamilia = catchAsync(async (req, res) => {
  const familia = await familiaService.getFamiliaById(req.params.familiaId);
  if (!familia) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  const historise = familia.history;
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

const searchFamilia = catchAsync(async (req, res) => {
  const familias = await familiaService.searchFamilia(req.params.familiaName);
  if (familias.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Familia not found');
  }
  const result = {
    total: familias.length,
    familias,
  };
  res.send(result);
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
  getChildOfOrdo,
  getHistoryFamilia,
  searchFamilia,
};
