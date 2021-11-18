const httpStatus = require('http-status');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');
const { getSpeciesById } = require('./species.service');

const createImage = async (data) => {
  if (await Image.isImageTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image already taken');
  }

  const species = await getSpeciesById(data.speciesId);
  if (!species) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Species not found');
  }

  const imageDoc = Image.create({
    ...data,
    Loai: data.speciesId,
  });

  return imageDoc;
};

const queryImages = async (filter, options) => {
  const images = await Image.paginate(filter, options);
  return images;
};

const getImageById = async (id) => {
  return Image.findById(id);
};

const deleteImageById = async (imageId) => {
  const image = await getImageById(imageId);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  await image.remove();
  return image;
};
const getImageByIdLoai = async (idLoai) => {
  // eslint-disable-next-line object-shorthand
  return Image.find({ idLoai: idLoai });
};
module.exports = {
  createImage,
  queryImages,
  getImageById,
  deleteImageById,
  getImageByIdLoai,
};
