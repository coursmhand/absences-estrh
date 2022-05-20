var express = require('express');
const classeController = require('../controllers/classe.controller');
const categorieController = require('../controllers/categorie.controller');
const moduleController = require('../controllers/module.controller');
const campusController = require('../controllers/campus.controller');
const enseigController = require('../controllers/enseignant.controller');
const multerConfig = require('../middlewares/multer.config');
const classeValidator = require('../middlewares/validators/classe.validator');
var router = express.Router();

/* GET home page. */
router.get('/', classeController.listClasse);
router.get('/classe/:id', classeController.showClasse);
router.get('/ajout-classe', classeController.addClasse);

//router.get('/ajout-classe', classeController.addClasse);
router.post('/ajout-classe', multerConfig, classeValidator, classeController.addOneClasse);

router.get('/ajout-categorie', categorieController.addCateg);
router.post('/ajout-categorie', categorieController.addCat);

router.get('/ajout-module', moduleController.addmod);
router.post('/ajout-module', moduleController.addmodule);

router.get('/ajout-campus', campusController.addCamp);
router.post('/ajout-campus', campusController.addCampus);

router.get('/ajout-enseignant', enseigController.addEnseig);
router.post('/ajout-enseignant', enseigController.addEnseignant);

//Modification d'une classe
router.get('/edit-classe/:id', classeController.editClasse);
router.post('/edit-classe/:id', multerConfig, classeController.editOneClasse);

module.exports = router;
