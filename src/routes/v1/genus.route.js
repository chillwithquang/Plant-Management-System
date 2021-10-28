const express = require('express');
const validate = require('../../middlewares/validate');
const genusValidation = require('../../validations/genus.validation');
const genusController = require('../../controllers/genus.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(genusValidation.createGenus), genusController.createGenus)
  .get(auth(MODES.GET), validate(genusValidation.getGenuss), genusController.getGenuss);

router
  .route('/:genusId')
  .get(auth(MODES.GET), validate(genusValidation.getGenus), genusController.getGenus)
  .patch(auth(MODES.MANAGE), validate(genusValidation.updateGenus), genusController.updateGenus)
  .delete(auth(MODES.MANAGE), validate(genusValidation.deleteGenus), genusController.deleteGenus);

module.exports = router;
