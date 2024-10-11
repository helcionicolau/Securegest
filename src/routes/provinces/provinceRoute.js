// routes/ProvinciaRoutes.js

const express = require('express');
const router = express.Router();
const provinciaController = require('../../controllers/provinces/provinceController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de províncias
router.get('/', provinciaController.getAllProvincias);
router.get('/:provinciaId', provinciaController.getProvinciaById);
router.get('/name/:provinciaName', provinciaController.getProvinciaByName);

module.exports = router;
