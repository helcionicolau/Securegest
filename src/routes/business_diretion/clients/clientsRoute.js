const express = require('express');
const router = express.Router();
const clienteController = require('../../../controllers/business_diretion/clients/clientController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');

// Rotas para o CRUD de clientes
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    clienteController.registerCliente
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    clienteController.getAllClientes
);
router.get('/:clienteId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    clienteController.getClienteById
);
router.put('/:clienteId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    clienteController.updateCliente
);
router.delete('/:clienteId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    clienteController.deleteCliente
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
