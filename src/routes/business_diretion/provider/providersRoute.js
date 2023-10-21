const express = require('express');
const router = express.Router();
const provedoraController = require('../../../controllers/business_diretion/provider/providerController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de provedoras
router.post('/register', authMiddleware.authenticateUserMiddleware, provedoraController.registerProvedora);
router.get('/', authMiddleware.authenticateUserMiddleware, provedoraController.getAllProvedoras);
router.get('/:provedoraId', authMiddleware.authenticateUserMiddleware, provedoraController.getProvedoraById);
router.put('/:provedoraId', authMiddleware.authenticateUserMiddleware, provedoraController.updateProvedora);
router.delete('/:provedoraId', authMiddleware.authenticateUserMiddleware, provedoraController.deleteProvedora);

module.exports = router;

// Created by António Baptista #(24/08/2023)