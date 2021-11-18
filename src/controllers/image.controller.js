const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { imageService } = require('../services');
const ApiError = require('../utils/ApiError');

const createImage = catchAsync(async (req, res) => {
  const image = await imageService.createImage(req.body);
  res.status(httpStatus.CREATED).send(image);
});

const getImages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await imageService.queryImages(filter, options);
  res.send(result);
});

const deleteImage = catchAsync(async (req, res) => {
  await imageService.deleteImageById(req.params.imageId);
  res.status(httpStatus.NO_CONTENT).send();
});
const getImageByIdLoai = catchAsync(async (req, res) => {
  const imageURL = await imageService.getImageByIdLoai(req.params.idLoai);
  if (!imageURL) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  res.send(imageURL[0].URL);
});
module.exports = {
  createImage,
  getImages,
  deleteImage,
  getImageByIdLoai,
};
