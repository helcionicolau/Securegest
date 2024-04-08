const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/menus/menuController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de menus
router.post('/register', menuController.createMenu, authMiddleware.authenticateUserMiddleware);
router.get('/', authMiddleware.authenticateUserMiddleware, menuController.getAllMenus);
router.get('/:menuId', authMiddleware.authenticateUserMiddleware, menuController.getMenuById);
router.put('/:menuId', authMiddleware.authenticateUserMiddleware, menuController.updateMenu);
router.delete('/:menuId', authMiddleware.authenticateUserMiddleware, menuController.deleteMenu);

module.exports = router;