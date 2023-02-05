const express = require('express');
const router = express.Router();
const listHonor = require("../controllers/honors").list;
const createHonor = require("../controllers/honors").create;
const updateHonor = require("../controllers/honors").update;
const deleteHonor = require("../controllers/honors").delRegister;

/**
 * Devuelve la información de un honor.
 */
router.get('/:id', function(req, res, next) {
  listHonor(req, res, next);
});

/**
 * Devuelve la información de los honores.
 */
router.get('/', function(req, res, next) {
  listHonor(req, res, next);
});

/**
 * Crea un nuevo Honor.
 */
router.post('/', function(req, res, next) {
  createHonor(req, res, next);
});

/**
 * Actualiza un honor.
 */
router.put('/:id', function(req, res, next) {
  updateHonor(req, res, next);
});

/**
 * Borra un honor
 */
router.delete('/:id', function(req, res, next) {
  deleteHonor(req, res, next);
});

module.exports = router;
