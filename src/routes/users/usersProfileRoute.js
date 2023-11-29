const express = require('express');
const router = express.Router();
const userProfileController = require('../../controllers/user//userProfileController');
const authMiddleware = require('../../middleware/authMiddleware');


router.post('/register', userProfileController.registerPerfil);
router.get('/', authMiddleware.authenticateUserMiddleware, userProfileController.getAllPerfis);
router.get('/:userId', authMiddleware.authenticateUserMiddleware, userProfileController.getPerfilById);
router.put('/:userId', authMiddleware.authenticateUserMiddleware, userProfileController.updatePerfil);
router.delete('/:userId', authMiddleware.authenticateUserMiddleware, userProfileController.deletePerfil);

module.exports = router;

// Created by António Baptista #(24/08/2023)