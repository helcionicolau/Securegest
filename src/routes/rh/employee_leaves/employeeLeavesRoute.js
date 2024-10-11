const express = require('express');
const router = express.Router();
const funcionarioSaidaController = require('../../../controllers/rh/employee_leaves/employeeLeaveController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de funcionários
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    funcionarioSaidaController.registerFuncionarioSaida
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioSaidaController.getAllFuncionarioSaidas
);
router.get('/total', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioSaidaController.getTotalFuncionarioSaidas
);
router.get('/:funcionarioSaidaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioSaidaController.getFuncionarioSaidaById
);
router.put('/:funcionarioSaidaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    funcionarioSaidaController.updateFuncionarioSaida
);
router.delete('/:funcionarioSaidaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    funcionarioSaidaController.deleteFuncionarioSaida
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
