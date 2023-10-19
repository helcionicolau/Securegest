const bcrypt = require('bcrypt');
const { userModel } = require('../../models/index');

module.exports = {
  async registerUser(req, res) {
    const { nome_usuario, email, senha, telefone } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const newUser = await userModel.create({
        nome_usuario,
        email,
        senha: hashedPassword,
        telefone,
      });

      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userModel.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  async getUserById(req, res) {
    const userId = req.params.userId; // ID do usuário a ser buscado

    try {
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
    }
  },

  async updateUser(req, res) {
    const userId = req.params.userId; // ID do usuário a ser atualizado
    const { nome_usuario, email, senha, telefone } = req.body;

    try {
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (nome_usuario) {
        user.nome_usuario = nome_usuario;
      }

      if (email) {
        user.email = email;
      }

      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        user.senha = hashedPassword;
      }

      if (telefone) {
        user.telefone = telefone;
      }

      await user.save();

      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req, res) {
    const userId = req.params.userId; // ID do usuário a ser excluído

    try {
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();

      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  },
};
