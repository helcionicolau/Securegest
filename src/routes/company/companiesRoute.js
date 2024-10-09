// routes/EmpresaRoutes.js

const express = require('express');
const router = express.Router();
const empresaController = require('../../controllers/company/companyController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de empresas
router.post('/', authMiddleware.authenticateUserMiddleware, empresaController.createEmpresa);
router.get('/', authMiddleware.authenticateUserMiddleware, empresaController.getAllEmpresas);
router.get('/:empresaId', authMiddleware.authenticateUserMiddleware, empresaController.getEmpresaById);
router.put('/:empresaId', authMiddleware.authenticateUserMiddleware, empresaController.updateEmpresa);
router.delete('/:empresaId', authMiddleware.authenticateUserMiddleware, empresaController.deleteEmpresa);

module.exports = router;
