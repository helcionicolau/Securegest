const express = require('express');
const router = express.Router();
const userProfileController = require('../../controllers/user_profile/userProfileController');
const authMiddleware = require('../../middleware/authMiddleware');


router.post('/register', userProfileController.registerPerfil);
router.get('/', authMiddleware.authenticateUserMiddleware, userProfileController.getAllPerfis);
router.get('/:perfilId', authMiddleware.authenticateUserMiddleware, userProfileController.getPerfilById);
router.put('/:perfilId', authMiddleware.authenticateUserMiddleware, userProfileController.updatePerfil);
router.delete('/:perfilId', authMiddleware.authenticateUserMiddleware, userProfileController.deletePerfil);

module.exports = router;

// Created by António Baptista #(24/08/2023)