// routes/ProvinciaRoutes.js

const express = require('express');
const router = express.Router();
const provinciaController = require('../../controllers/provinces/provinceController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de províncias
router.get('/', authMiddleware.authenticateUserMiddleware, provinciaController.getAllProvincias);
router.get('/:provinciaId', authMiddleware.authenticateUserMiddleware, provinciaController.getProvinciaById);
router.get('/name/:provinciaName', authMiddleware.authenticateUserMiddleware, provinciaController.getProvinciaByName);

module.exports = router;
