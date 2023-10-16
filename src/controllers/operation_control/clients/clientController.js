const Cliente = require('../../../models/operation_control/clients/Client');

exports.registerCliente = async (req, res) => {
  const { nome, endereco, info_contato } = req.body;

  try {
    const newCliente = await Cliente.create({
      nome,
      endereco,
      info_contato,
    });

    res.status(201).json({ message: 'Cliente registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar cliente' });
  }
};

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

exports.getClienteById = async (req, res) => {
  const clienteId = req.params.clienteId; // ID do cliente a ser buscado

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cliente por ID' });
  }
};

exports.updateCliente = async (req, res) => {
  const clienteId = req.params.clienteId; // ID do cliente a ser atualizado
  const { nome, endereco, info_contato } = req.body;

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Atualiza apenas os campos fornecidos na requisição
    Object.assign(cliente, {
      nome,
      endereco,
      info_contato,
    });

    await cliente.save();

    res.json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

exports.deleteCliente = async (req, res) => {
  const clienteId = req.params.clienteId; // ID do cliente a ser excluído

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await cliente.destroy();

    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
};

// Created by António Baptista #(24/08/2023)