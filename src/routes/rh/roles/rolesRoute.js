const express = require('express');
const router = express.Router();
const cargosController = require('../../../controllers/rh/roles/roleController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de cargos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    cargosController.registerCargo
);

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    cargosController.getAllCargos
);

router.get('/:cargoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    cargosController.getCargoById
);

router.put('/:cargoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    cargosController.updateCargo
);

router.delete('/:cargoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    cargosController.deleteCargo
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
