const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ordoService } = require('../services');

const createOrdo = catchAsync(async (req, res) => {
  const ordo = await ordoService.createOrdo(req.body);
  res.status(httpStatus.CREATED).send(ordo);
});

const getOrdos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ordoService.queryOrdos(filter, options);
  res.send(result);
});

const getOrdo = catchAsync(async (req, res) => {
  const ordo = await ordoService.getOrdoById(req.params.ordoId);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }
  res.send(ordo);
});

const updateOrdo = catchAsync(async (req, res) => {
  const user = await ordoService.updateOrdoById(req.params.ordoId, req.body);
  res.send(user);
});

const deleteOrdo = catchAsync(async (req, res) => {
  await ordoService.deleteOrdoById(req.params.ordoId);
  res.status(httpStatus.NO_CONTENT).send();
});
const getOrderByName = catchAsync(async (req, res) => {
  const order = await ordoService.getOrderByName(req.params.orderName);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const suggestOrderName = catchAsync(async (req, res) => {
  const order = await ordoService.suggestOrderName();
  const suggestion = [];
  for (let i = 0; i < order.length; i += 1) {
    suggestion.push(order[i].Ten_KH);
  }
  if (!suggestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(suggestion.filter((value) => value.includes(req.params.name)));
});
module.exports = {
  createOrdo,
  getOrdos,
  getOrdo,
  updateOrdo,
  deleteOrdo,
  getOrderByName,
  suggestOrderName,
};
