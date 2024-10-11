const express = require('express');
const router = express.Router();
const feriasController = require('../../../controllers/rh/holidays/holidayController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de férias
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    feriasController.registerFeria
);

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    feriasController.getAllFerias
);

router.get('/total', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    feriasController.getTotalFerias
);

router.get('/:feriasId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    feriasController.getFeriaById
);

router.put('/:feriasId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    feriasController.updateFeria
);

router.delete('/:feriasId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    feriasController.deleteFeria
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
