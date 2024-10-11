const express = require('express');
const router = express.Router();
const funcionarioDepartamentoController = require('../../../controllers/rh/employees_departments/edController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de associações funcionário-departamento
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    funcionarioDepartamentoController.registerFuncionarioDepartamento
);

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioDepartamentoController.getAllFuncionariosDepartamentos
);

router.get('/employee/:funcionarioId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioDepartamentoController.getAssociationsByFuncionarioId
);

router.get('/department/:departamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioDepartamentoController.getAssociationsByDepartamentoId
);

router.get('/:funcionarioDepartamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioDepartamentoController.getFuncionarioDepartamentoById
);

router.put('/:funcionarioDepartamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    funcionarioDepartamentoController.updateFuncionarioDepartamento
);

router.delete('/:funcionarioDepartamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    funcionarioDepartamentoController.deleteFuncionarioDepartamento
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
