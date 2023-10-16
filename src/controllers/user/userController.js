const bcrypt = require('bcrypt');
const User = require('../../models/user/User');

exports.registerUser = async (req, res) => {
  const { id_usuario, nome_usuario, email, senha, telefone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await User.create({
      nome_usuario,
      email,
      senha: hashedPassword,
      telefone
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId; // ID do usuário a ser buscado

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId; // ID do usuário a ser atualizado
  const { nome_usuario, email, senha, telefone } = req.body;

  try {
      const user = await User.findByPk(userId);
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
          user.senha = senha;
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
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.userId; // ID do usuário a ser excluído

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();

    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};

// Adicione outras operações relacionadas ao usuário aqui, como atualização de perfil e uploads de imagem
// Created by António Baptista #(24/08/2023)