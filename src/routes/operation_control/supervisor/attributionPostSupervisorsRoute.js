const express = require('express');
const router = express.Router();
const postoSupervisorController = require('../../../controllers/operation_control/supervisor/attributionPostSupervisorController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de departamentos
router.post('/register', authMiddleware.authenticateUserMiddleware, postoSupervisorController.registerPostoSupervisor);
router.get('/', authMiddleware.authenticateUserMiddleware, postoSupervisorController.getAllPostosSupervisores);
router.get('/supervisor-users', authMiddleware.authenticateUserMiddleware, postoSupervisorController.getAllSupervisorUsers);
router.get('/:postoSupervisorId', authMiddleware.authenticateUserMiddleware, postoSupervisorController.getPostoSupervisorById);
router.put('/:postoSupervisorId', authMiddleware.authenticateUserMiddleware, postoSupervisorController.updatePostoSupervisor);
router.delete('/:postoSupervisorId', authMiddleware.authenticateUserMiddleware, postoSupervisorController.deletePostoSupervisor);

module.exports = router;

// Created by António Baptista #(24/08/2023)
