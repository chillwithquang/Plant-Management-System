const httpStatus = require('http-status');
const { Divisio } = require('../models');
const ApiError = require('../utils/ApiError');

const createDivisio = async (data) => {
  if (await Divisio.isDivisioTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Divisio already taken');
  }
  return Divisio.create(data);
};

const queryDivisios = async (filter, options) => {
  const divisios = await Divisio.paginate(filter, options);
  return divisios;
};

const getDivisioById = async (id) => {
  return Divisio.findById(id);
};

const updateDivisioById = async (divisioId, updateBody) => {
  const divisio = await getDivisioById(divisioId);
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }
  if (updateBody.Ten_KH && (await Divisio.isDivisioTaken(updateBody.Ten_KH, divisioId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Divisio already taken');
  }
  Object.assign(divisio, updateBody);
  await divisio.save();
  return divisio;
};

const deleteDivisioById = async (divisioId) => {
  const divisio = await getDivisioById(divisioId);
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }
  await divisio.remove();
  return divisio;
};

module.exports = {
  createDivisio,
  queryDivisios,
  getDivisioById,
  updateDivisioById,
  deleteDivisioById,
};
