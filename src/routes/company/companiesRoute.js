// routes/EmpresaRoutes.js

const express = require('express');
const router = express.Router();
const empresaController = require('../../controllers/company/companyController');
const authMiddleware = require('../../middleware/authMiddleware');
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de empresas
router.post('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    empresaController.createEmpresa
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    empresaController.getAllEmpresas
);
router.get('/:empresaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    empresaController.getEmpresaById
);
router.put('/:empresaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    empresaController.updateEmpresa
);
router.delete('/:empresaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    empresaController.deleteEmpresa
);

module.exports = router;
