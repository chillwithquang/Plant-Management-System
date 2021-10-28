const express = require('express');
const validate = require('../../middlewares/validate');
const plantValidation = require('../../validations/plant.validation');
const plantController = require('../../controllers/plant.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(plantValidation.createPlant), plantController.createPlant)
  .get(auth(MODES.GET), validate(plantValidation.getPlants), plantController.getPlants);

router
  .route('/:plantId')
  .get(auth(MODES.GET), validate(plantValidation.getPlant), plantController.getPlant)
  .patch(auth(MODES.MANAGE), validate(plantValidation.updatePlant), plantController.updatePlant)
  .delete(auth(MODES.MANAGE), validate(plantValidation.deletePlant), plantController.deletePlant);

module.exports = router;
