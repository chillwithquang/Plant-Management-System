const express = require('express');
const validate = require('../../middlewares/validate');
const imageValidation = require('../../validations/image.validation');
const imageController = require('../../controllers/image.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(imageValidation.createImage), imageController.createImage)
  .get(auth(MODES.GET), validate(imageValidation.getImages), imageController.getImages);

router.route('/:imageId').delete(auth(MODES.MANAGE), validate(imageValidation.deleteImage), imageController.deleteImage);
router
  .route('/getByIdLoai/:idLoai')
  .get(auth(MODES.GET), validate(imageValidation.getImageByIdLoai), imageController.getImageByIdLoai);
module.exports = router;
