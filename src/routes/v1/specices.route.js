const express = require('express');
const validate = require('../../middlewares/validate');
const speciesValidation = require('../../validations/species.validation');
const speciesController = require('../../controllers/species.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(speciesValidation.createSpecies), speciesController.createSpecies)
  .get(auth(MODES.GET), validate(speciesValidation.getSpeciess), speciesController.getSpeciess);

router
  .route('/:speciesId')
  .get(auth(MODES.GET), validate(speciesValidation.getSpecies), speciesController.getSpecies)
  .patch(auth(MODES.MANAGE), validate(speciesValidation.updateSpecies), speciesController.updateSpecies)
  .delete(auth(MODES.MANAGE), validate(speciesValidation.deleteSpecies), speciesController.deleteSpecies);
router
  .route('/getByName/:speciesName')
  .get(auth(MODES.GET), validate(speciesValidation.getSpeciesByName), speciesController.getSpeciesByName);

router
  .route('/:speciesId/:eraser')
  .delete(auth(MODES.MANAGE), validate(speciesValidation.eraseSpeciesById), speciesController.eraseSpecies);

router
  .route('/restore/:speciesId')
  .patch(auth(MODES.GET), validate(speciesValidation.restoreSpecies), speciesController.restoreSpecies);

router
  .route('/suggest/:name')
  .get(auth(MODES.GET), validate(speciesValidation.suggestSpeciesName), speciesController.suggestSpeciesName);
router
  .route('/getParentByGenusId/:genusId')
  .get(auth(MODES.GET), validate(speciesValidation.getParentSpecies), speciesController.getParentSpecies);
module.exports = router;
