const { employeesModel, departamentsModel, countyModel, companyModel, roleModel } = require('../../../models/index');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Definir pasta base de upload
const UPLOAD_BASE_PATH = path.join(__dirname, '../../../uploads');

// Função para criar diretórios dinamicamente
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Configuração do Multer para o upload da foto
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const empresaId = req.body.empresa_id;

    try {
      const empresa = await companyModel.findByPk(empresaId);
      if (!empresa) {
        return cb(new Error('Empresa não encontrada'));
      }
      const dir = path.join(UPLOAD_BASE_PATH, empresa.nome.toLowerCase(), 'perfil'); // Usar o nome da empresa
      createDirectoryIfNotExists(dir);
      cb(null, dir);
    } catch (error) {
      cb(new Error('Erro ao buscar empresa: ' + error.message));
    }
  },
  filename: (req, file, cb) => {
    const n_mec = req.body.n_mec;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${n_mec}_${Date.now()}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = {
  // Registrar Funcionário com Upload de Foto
  async registerFuncionario(req, res) {
    const {
      n_mec,
      nome,
      sexo,
      estado_civil,
      data_nascimento,
      nif,
      cargo,
      role_id,
      departamento_id,
      municipio_id,
      email,
      telefone,
      isactive,
      empresa_id
    } = req.body;

    try {
      createDirectoryIfNotExists(UPLOAD_BASE_PATH);

      const hashedPassword = await bcrypt.hash(n_mec, 10); // Usar n_mec como senha padrão

      let photo_path = req.file ? req.file.path : 'https://avatars.githubusercontent.com/u/181027078?v=4';

      const newFuncionario = await employeesModel.create({
        n_mec,
        nome,
        sexo,
        estado_civil,
        data_nascimento,
        nif,
        cargo,
        role_id,
        departamento_id,
        municipio_id,
        email,
        telefone,
        senha: hashedPassword,
        isactive,
        photo_path,
        empresa_id
      });

      res.status(201).json({ message: 'Funcionário registrado com sucesso!', funcionario: newFuncionario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar funcionário' });
    }
  },

  // Obter todos os funcionários
  async getAllFuncionarios(req, res) {
    try {
      const funcionarios = await employeesModel.findAll({
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: countyModel, as: 'municipio' },
          { model: companyModel, as: 'empresa' },
          { model: roleModel, as: 'papel' }
        ]
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
  },

  // Obter funcionário por ID
  async getFuncionarioById(req, res) {
    const funcionarioId = req.params.funcionarioId;
  
    try {
      const funcionario = await employeesModel.findByPk(funcionarioId, {
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: countyModel, as: 'municipio' },
          { model: companyModel, as: 'empresa' },
          { model: roleModel, as: 'papel' }
        ]
      });
  
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }
  
      // Modificar o caminho da imagem para incluir a URL completa do servidor
      funcionario.photo_path = `https://securegest.onrender.com${funcionario.photo_path}`;
  
      res.json(funcionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionário por ID' });
    }
  }
  ,

  // Buscar funcionários por cargo
  async getFuncionariosByCargo(req, res) {
    const { cargo } = req.params;

    try {
      const funcionarios = await employeesModel.findAll({
        where: { cargo },
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: countyModel, as: 'municipio' },
          { model: companyModel, as: 'empresa' },
          { model: roleModel, as: 'papel' }
        ]
      });

      if (!funcionarios || funcionarios.length === 0) {
        return res.status(404).json({ message: 'Não há funcionários com o cargo especificado' });
      }

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários pelo cargo' });
    }
  },

  // Buscar funcionários por departamento
  async getFuncionariosByDepartamentoId(req, res) {
    const { departamentoId } = req.params;

    try {
      const funcionarios = await employeesModel.findAll({
        where: { departamento_id: departamentoId },
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: countyModel, as: 'municipio' },
          { model: companyModel, as: 'empresa' },
          { model: roleModel, as: 'papel' }
        ]
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários pelo departamento ID' });
    }
  },

  // Atualizar funcionário, incluindo a foto de perfil se houver
  async updateFuncionario(req, res) {
    const funcionarioId = req.params.funcionarioId;
    const updateFields = req.body;

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      // Verificar se há upload de nova foto
      if (req.file) {
        const newPhotoPath = req.file.path;
        funcionario.photo_path = newPhotoPath;
      }

      // Atualizar outros campos (exceto a foto)
      Object.keys(updateFields).forEach(async (field) => {
        if (updateFields[field] !== undefined) {
          if (field === 'senha') {
            const hashedPassword = await bcrypt.hash(updateFields[field], 10); // Hash da nova senha
            funcionario[field] = hashedPassword;
          } else {
            funcionario[field] = updateFields[field];
          }
        }
      });

      await funcionario.save();

      res.json({ message: 'Funcionário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar funcionário' });
    }
  },

  // Excluir funcionário
  async deleteFuncionario(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      await funcionario.destroy();

      res.json({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir funcionário' });
    }
  }
};
