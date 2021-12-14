const express = require('express');
const validate = require('../../middlewares/validate');
const classisValidation = require('../../validations/classis.validation');
const classisController = require('../../controllers/classis.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(classisValidation.createClassis), classisController.createClassis)
  .get(auth(MODES.GET), validate(classisValidation.getClassiss), classisController.getClassiss);

router
  .route('/:classisId')
  .get(auth(MODES.GET), validate(classisValidation.getClassis), classisController.getClassis)
  .patch(auth(MODES.MANAGE), validate(classisValidation.updateClassis), classisController.updateClassis)
  .delete(auth(MODES.MANAGE), validate(classisValidation.deleteClassis), classisController.deleteClassis);

router
  .route('/:classisId/:eraser')
  .delete(auth(MODES.MANAGE), validate(classisValidation.eraseClassisById), classisController.eraseClassis);

router
  .route('/restore/:classisId')
  .patch(auth(MODES.GET), validate(classisValidation.restoreClassis), classisController.restoreClassis);

router
  .route('/getByName/:classisName')
  .get(auth(MODES.GET), validate(classisValidation.getClassisByName), classisController.getClassisByName);

router
  .route('/suggest/:name')
  .get(auth(MODES.GET), validate(classisValidation.suggestClassisName), classisController.suggestClassisName);
module.exports = router;
