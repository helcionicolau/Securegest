const express = require('express');
const router = express.Router();
const clienteController = require('../../../controllers/business_diretion/clients/clientController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de clientes
router.post('/register', authMiddleware.authenticateUserMiddleware, clienteController.registerCliente);
router.get('/', authMiddleware.authenticateUserMiddleware, clienteController.getAllClientes);
router.get('/:clienteId', authMiddleware.authenticateUserMiddleware, clienteController.getClienteById);
router.put('/:clienteId', authMiddleware.authenticateUserMiddleware, clienteController.updateCliente);
router.delete('/:clienteId', authMiddleware.authenticateUserMiddleware, clienteController.deleteCliente);

module.exports = router;

// Created by António Baptista #(24/08/2023)