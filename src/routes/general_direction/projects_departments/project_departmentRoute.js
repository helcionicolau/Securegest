const express = require('express');
const router = express.Router();
const projetoDepartamentoController = require('../../../controllers/general_direction/projects_departments/project_departmentController');
const authMiddleware = require('../../../middleware/authMiddleware'); 
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de associações entre projetos e departamentos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    projetoDepartamentoController.createProjetoDepartamento
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoDepartamentoController.getAllProjetosDepartamentos
);
router.get('/:projetoDepartamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoDepartamentoController.getProjetoDepartamentoById
);
router.get('/projeto/:projetoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoDepartamentoController.getProjetosDepartamentosByProjetoId
);
router.get('/departamento/:departamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoDepartamentoController.getProjetosDepartamentosByDepartamentoId
);
router.put('/:projetoDepartamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    projetoDepartamentoController.updateProjetoDepartamento
);
router.delete('/:projetoDepartamentoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    projetoDepartamentoController.deleteProjetoDepartamento
);

module.exports = router;
