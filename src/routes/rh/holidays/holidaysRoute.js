const express = require('express');
const router = express.Router();
const feriasController = require('../../../controllers/rh/holidays/holidayController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de férias
router.post('/register', authMiddleware.authenticateUserMiddleware, feriasController.registerFeria);
router.get('/', authMiddleware.authenticateUserMiddleware, feriasController.getAllFerias);
router.get('/total', authMiddleware.authenticateUserMiddleware, feriasController.getTotalFerias);
router.get('/:feriasId', authMiddleware.authenticateUserMiddleware, feriasController.getFeriaById);
router.put('/:feriasId', authMiddleware.authenticateUserMiddleware, feriasController.updateFeria);
router.delete('/:feriasId', authMiddleware.authenticateUserMiddleware, feriasController.deleteFeria);

module.exports = router;

// Created by António Baptista #(24/08/2023)