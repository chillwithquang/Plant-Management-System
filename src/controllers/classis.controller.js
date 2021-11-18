const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classisService } = require('../services');

const createClassis = catchAsync(async (req, res) => {
  const classis = await classisService.createClassis(req.body);
  res.status(httpStatus.CREATED).send(classis);
});

const getClassiss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classisService.queryClassiss(filter, options);
  res.send(result);
});

const getClassis = catchAsync(async (req, res) => {
  const classis = await classisService.getClassisById(req.params.classisId);
  if (!classis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }
  res.send(classis);
});

const updateClassis = catchAsync(async (req, res) => {
  const user = await classisService.updateClassisById(req.params.classisId, req.body);
  res.send(user);
});

const deleteClassis = catchAsync(async (req, res) => {
  await classisService.deleteClassisById(req.params.classisId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getClassisByName = catchAsync(async (req, res) => {
  const classis = await classisService.getClassisByName(req.params.classisName);
  if (!classis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }
  res.send(classis);
});

const suggestClassisName = catchAsync(async (req, res) => {
  const classis = await classisService.suggestClassisName();
  const suggestion = [];
  for (let i = 0; i < classis.length; i += 1) {
    suggestion.push(classis[i].Ten_KH);
  }
  if (!suggestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }
  res.send(suggestion.filter((value) => value.includes(req.params.name)));
});

module.exports = {
  createClassis,
  getClassiss,
  getClassis,
  updateClassis,
  deleteClassis,
  getClassisByName,
  suggestClassisName,
};
