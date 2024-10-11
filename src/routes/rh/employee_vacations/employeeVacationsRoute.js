const express = require('express');
const router = express.Router();
const funcionarioFeriasController = require('../../../controllers/rh/employee_vacations/employeeVacationController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rota para registrar uma nova solicitação de férias
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    funcionarioFeriasController.registrarFerias
);

// Rota para listar todas as solicitações de férias
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioFeriasController.listarTodasFerias
);

// Rota para aprovar ou rejeitar uma solicitação de férias
router.put('/:feriasId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('approveReject'), // Permissão para aprovar ou rejeitar
    funcionarioFeriasController.aprovarRejeitarFerias
);

// Rota para atualizar uma solicitação de férias
router.put('/update/:feriasId', // Modificado para evitar conflito com a rota de aprovação
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    funcionarioFeriasController.updateFuncionarioFerias
);

// Rota para consultar o saldo atual de férias de um funcionário
router.get('/balance/:funcionarioId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioFeriasController.consultarSaldoFerias
);

// Rota para consultar detalhes de uma solicitação de férias por ID
router.get('/:feriasId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioFeriasController.getFuncionarioFeriasById
);

// Rota para excluír férias por ID
router.delete('/:feriasId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    funcionarioFeriasController.excluirFerias
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
