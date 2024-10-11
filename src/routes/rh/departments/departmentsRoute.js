const express = require('express');
const router = express.Router();
const departamentoController = require('../../../controllers/rh/departments/departmentController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de departamentos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    departamentoController.registerDepartamento
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    departamentoController.getAllDepartamentos
);
router.get('/total', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    departamentoController.getTotalDepartamentos
);
router.get('/:departamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    departamentoController.getDepartamentoById
);
router.put('/:departamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    departamentoController.updateDepartamento
);
router.delete('/:departamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    departamentoController.deleteDepartamento
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
