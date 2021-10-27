const httpStatus = require('http-status');
const { Classis } = require('../models');
const ApiError = require('../utils/ApiError');
const { getDivisioById } = require('./divisio.service');

const createClassis = async (data) => {
  if (await Classis.isClassisTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Classis already taken');
  }

  const divisio = await getDivisioById(data.divisioId);
  if (!divisio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Divisio not found');
  }

  const classisDoc = Classis.create({
    ...data,
    Nganh: data.divisioId,
  });

  return classisDoc;
};

const queryClassiss = async (filter, options) => {
  const classiss = await Classis.paginate(filter, options);
  return classiss;
};

const getClassisById = async (id) => {
  return Classis.findById(id);
};

const updateClassisById = async (classisId, updateBody) => {
  const classis = await getClassisById(classisId);
  if (!classis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }
  if (updateBody.Ten_KH && (await Classis.isClassisTaken(updateBody.Ten_KH, classisId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Classis already taken');
  }
  Object.assign(classis, updateBody);
  await classis.save();
  return classis;
};

const deleteClassisById = async (classisId) => {
  const classis = await getClassisById(classisId);
  if (!classis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }
  await classis.remove();
  return classis;
};

module.exports = {
  createClassis,
  queryClassiss,
  getClassisById,
  updateClassisById,
  deleteClassisById,
};
