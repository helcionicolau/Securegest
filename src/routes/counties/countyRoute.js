// routes/MunicipioRoutes.js

const express = require('express');
const router = express.Router();
const municipioController = require('../../controllers/counties/countyController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas para o CRUD de municípios
router.get('/', authMiddleware.authenticateUserMiddleware, municipioController.getAllMunicipios);
router.get('/:municipioId', authMiddleware.authenticateUserMiddleware, municipioController.getMunicipioById);
router.get('/name/:municipioName', authMiddleware.authenticateUserMiddleware, municipioController.getMunicipioByName);

module.exports = router;