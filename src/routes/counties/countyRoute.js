// routes/MunicipioRoutes.js

const express = require('express');
const router = express.Router();
const municipioController = require('../../controllers/counties/countyController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de municípios
router.get('/', municipioController.getAllMunicipios);
router.get('/:municipioId', municipioController.getMunicipioById);
router.get('/name/:municipioName', municipioController.getMunicipioByName);
router.get('/provincia/:provinciaId', municipioController.getMunicipioByProvinciaId);

module.exports = router;