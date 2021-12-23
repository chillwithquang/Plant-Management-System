const express = require('express');
const validate = require('../../middlewares/validate');
const ordoValidation = require('../../validations/ordo.validation');
const ordoController = require('../../controllers/ordo.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(ordoValidation.createOrdo), ordoController.createOrdo)
  .get(auth(MODES.GET), validate(ordoValidation.getOrdos), ordoController.getOrdos);

router
  .route('/:ordoId')
  .get(auth(MODES.GET), validate(ordoValidation.getOrdo), ordoController.getOrdo)
  .patch(auth(MODES.MANAGE), validate(ordoValidation.updateOrdo), ordoController.updateOrdo)
  .delete(auth(MODES.MANAGE), validate(ordoValidation.deleteOrdo), ordoController.deleteOrdo);
router
  .route('/:ordoId/:eraser')
  .delete(auth(MODES.MANAGE), validate(ordoValidation.eraseOrdoById), ordoController.eraseOrdo);

router.route('/restore/:ordoId').patch(auth(MODES.GET), validate(ordoValidation.restoreOrdo), ordoController.restoreOrdo);

router
  .route('/getByName/:orderName')
  .get(auth(MODES.GET), validate(ordoValidation.getOrderByName), ordoController.getOrderByName);
router
  .route('/suggest/:name')
  .get(auth(MODES.GET), validate(ordoValidation.suggestOrderName), ordoController.suggestOrderName);

router
  .route('/getChildOfClassis/:classisName')
  .get(auth(MODES.GET), validate(ordoValidation.getChildOfClassis), ordoController.getChildOfClassis);

router
  .route('/getHistoryOrdo/:ordoId')
  .get(auth(MODES.GET), validate(ordoValidation.getOrdo), ordoController.getHistoryOrdo);
module.exports = router;
