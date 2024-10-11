const express = require('express');
const router = express.Router();
const levantamentoController = require('../../../controllers/business_diretion/dn_request/dnRequestController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');

// Rotas para o CRUD de levantamentos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    levantamentoController.registerLevantamento
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    levantamentoController.getAllLevantamentos
);
router.get('/:levantamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    levantamentoController.getLevantamentoById
);
router.put('/:levantamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    levantamentoController.updateLevantamento
);
router.delete('/:levantamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    levantamentoController.deleteLevantamento
);

// Adicionando rotas para obter levantamentos por departamento e cliente
router.get('/departamento/:departamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    levantamentoController.getLevantamentosByDepartamentoId
);
router.get('/cliente/:clienteId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    levantamentoController.getLevantamentosByClienteId
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
