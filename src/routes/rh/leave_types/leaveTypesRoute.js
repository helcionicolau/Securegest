const express = require('express');
const router = express.Router();
const tipoSaidaController = require('../../../controllers/rh/leave_types/leaveTypeController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de tipos de saída
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    tipoSaidaController.registerTipoSaida
);

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    tipoSaidaController.getAllTipoSaidas
);

router.get('/total', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    tipoSaidaController.getTotalTipoSaidas
);

router.get('/:tipoSaidaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    tipoSaidaController.getTipoSaidaById
);

router.put('/:tipoSaidaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    tipoSaidaController.updateTipoSaida
);

router.delete('/:tipoSaidaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    tipoSaidaController.deleteTipoSaida
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
