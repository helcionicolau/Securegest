const express = require('express');
const router = express.Router();
const projetoDepartamentoController = require('../../../controllers/general_direction/projects_departments/project_departmentController');
const authMiddleware = require('../../../middleware/authMiddleware'); // Assuming authMiddleware exists

// Rotas para o CRUD de associações entre projetos e departamentos
router.post('/register', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.createProjetoDepartamento);
router.get('/', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.getAllProjetosDepartamentos);
router.get('/:projetoDepartamentoId', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.getProjetoDepartamentoById);
router.get('/projeto/:projetoId', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.getProjetosDepartamentosByProjetoId);
router.get('/departamento/:departamentoId', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.getProjetosDepartamentosByDepartamentoId);
router.put('/:projetoDepartamentoId', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.updateProjetoDepartamento);
router.delete('/:projetoDepartamentoId', authMiddleware.authenticateUserMiddleware, projetoDepartamentoController.deleteProjetoDepartamento);

module.exports = router;
