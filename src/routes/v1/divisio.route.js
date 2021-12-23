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
  .delete(auth(MODES.MANAGE), validate(divisioValidation.deleteDivisioById), divisioController.deleteDivisio);

router
  .route('/:divisioId/:eraser')
  .delete(auth(MODES.MANAGE), validate(divisioValidation.eraseDivisioById), divisioController.eraseDivisio);

router
  .route('/restore/:divisioId')
  .patch(auth(MODES.GET), validate(divisioValidation.restoreDivisio), divisioController.restoreDivisio);
router
  .route('/getByName/:divisioName')
  .get(auth(MODES.GET), validate(divisioValidation.getDivisioByName), divisioController.getDivisioByName);

router
  .route('/suggest/:name')
  .get(auth(MODES.GET), validate(divisioValidation.suggestDivisioName), divisioController.suggestDivisioName);

router
  .route('/getHistoryDivisio/:divisioId')
  .get(auth(MODES.GET), validate(divisioValidation.getDivisio), divisioController.getHistoryDivisio);
module.exports = router;
