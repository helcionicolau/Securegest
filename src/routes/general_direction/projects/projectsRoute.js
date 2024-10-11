const express = require('express');
const router = express.Router();
const projetoController = require('../../../controllers/general_direction/projects/projectController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de projetos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    projetoController.createProjeto
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoController.getAllProjetos
);
router.get('/:projetoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoController.getProjetoById
);
router.put('/:projetoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    projetoController.updateProjeto
);
router.delete('/:projetoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    projetoController.deleteProjeto
);

// Rota para buscar projetos por ID da posição
router.get('/posicao/:posicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    projetoController.getProjetosByPosicaoId
);

module.exports = router;
