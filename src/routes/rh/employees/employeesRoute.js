const express = require('express');
const router = express.Router();
const funcionarioController = require('../../../controllers/rh/employees/employeeController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Definir pasta base de upload na raiz do projeto
const UPLOAD_BASE_PATH = path.join(__dirname, '../../../uploads');

// Função para criar diretórios dinamicamente
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Certificar que a pasta de upload existe
createDirectoryIfNotExists(UPLOAD_BASE_PATH);

// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createDirectoryIfNotExists(UPLOAD_BASE_PATH);
    cb(null, UPLOAD_BASE_PATH); // Pasta raiz
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nome único com timestamp
  }
});

const upload = multer({ storage: storage });

// Rotas para o CRUD de funcionários
router.post('/register', authMiddleware.authenticateUserMiddleware, accessMiddleware('add'), upload.single('photo_path'), funcionarioController.registerFuncionario);
router.get('/', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getAllFuncionarios);
router.get('/:funcionarioId', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getFuncionarioById);

// Atualizar funcionário com upload de nova foto
router.put('/:funcionarioId', authMiddleware.authenticateUserMiddleware, accessMiddleware('update'), upload.single('photo_path'), funcionarioController.updateFuncionario);

router.delete('/:funcionarioId', authMiddleware.authenticateUserMiddleware, accessMiddleware('delete'), funcionarioController.deleteFuncionario);

// Adicionar rota para obter funcionários por departamento
router.get('/departamento/:departamentoId', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getFuncionariosByDepartamentoId);

// Adicionar rota para obter funcionários por cargo
router.get('/cargo/:cargo', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getFuncionariosByCargo);

module.exports = router;
