const express = require('express');
const router = express.Router();
const funcionarioCargosController = require('../../../controllers/rh/employee_roles/employeeRoleController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de funcionário_cargos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    funcionarioCargosController.registerFuncionarioCargo
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioCargosController.getAllFuncionarioCargos
);
router.get('/:funcionarioCargoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioCargosController.getFuncionarioCargoById
);
router.delete('/:funcionarioCargoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    funcionarioCargosController.deleteFuncionarioCargo
);
router.get('/byFuncionarioIdOrCargoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioCargosController.getFuncionarioCargoByFuncionarioIdOrCargoId
);

// Adicione outras rotas aqui conforme necessário

module.exports = router;
