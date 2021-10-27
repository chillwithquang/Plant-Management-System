const express = require('express');
const validate = require('../../middlewares/validate');
const divisioValidation = require('../../validations/divisio.validation');
const divisioController = require('../../controllers/divisio.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(divisioValidation.createDivisio), divisioController.createDivisio)
  .get(auth(MODES.GET), validate(divisioValidation.getDivisios), divisioController.getDivisios);

router
  .route('/:divisioId')
  .get(auth(MODES.GET), validate(divisioValidation.getDivisio), divisioController.getDivisio)
  .patch(auth(MODES.MANAGE), validate(divisioValidation.updateDivisio), divisioController.updateDivisio)
  .delete(auth(MODES.MANAGE), validate(divisioValidation.deleteDivisio), divisioController.deleteDivisio);

module.exports = router;
