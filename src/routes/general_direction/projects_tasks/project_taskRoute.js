const express = require('express');
const router = express.Router();
const funcionarioTarefaController = require('../../../controllers/general_direction/employees_tasks/employeeTaskController');
const authMiddleware = require('../../../middleware/authMiddleware'); 
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de tarefas
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    funcionarioTarefaController.createFuncionarioTarefa
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioTarefaController.getAllFuncionarioTarefas
);
router.get('/:tarefaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    funcionarioTarefaController.getFuncionarioTarefaById
);
router.put('/:tarefaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    funcionarioTarefaController.updateFuncionarioTarefa
);
router.delete('/:tarefaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    funcionarioTarefaController.deleteFuncionarioTarefa
);

module.exports = router;
