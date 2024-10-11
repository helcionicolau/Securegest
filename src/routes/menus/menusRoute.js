const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/menus/menuController');
const authMiddleware = require('../../middleware/authMiddleware');
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de menus
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    menuController.createMenu
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    menuController.getAllMenus
);
router.get('/:menuId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    menuController.getMenuById
);
router.put('/:menuId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    menuController.updateMenu
);
router.delete('/:menuId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    menuController.deleteMenu
);

module.exports = router;
