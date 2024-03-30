const express = require('express');
const router = express.Router();
const funcionarioCargosController = require('../../../controllers/rh/employee_roles/employeeRoleController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de funcionário_cargos
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioCargosController.registerFuncionarioCargo);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioCargosController.getAllFuncionarioCargos);
router.get('/:funcionarioCargoId', authMiddleware.authenticateUserMiddleware, funcionarioCargosController.getFuncionarioCargoById);
router.delete('/:funcionarioCargoId', authMiddleware.authenticateUserMiddleware, funcionarioCargosController.deleteFuncionarioCargo);
router.get('/byFuncionarioIdOrCargoId', authMiddleware.authenticateUserMiddleware, funcionarioCargosController.getFuncionarioCargoByFuncionarioIdOrCargoId);

// Adicione outras rotas aqui conforme necessário

module.exports = router;
