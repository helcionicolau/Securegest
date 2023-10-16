const Departamento = require('../../../models/rh/departments/Department');

exports.registerDepartamento = async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const newDepartamento = await Departamento.create({
      nome,
      descricao
    });

    res.status(201).json({ message: 'Departamento registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar departamento' });
  }
};

exports.getAllDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.findAll();
    res.json(departamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar departamentos' });
  }
};

exports.getTotalDepartamentos = async (req, res) => {
  try {
    // Obtém o número total de departamentos usando a função count do Sequelize
    const totalDepartamentos = await Departamento.count();
    
    res.json( totalDepartamentos );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de departamentos' });
  }
};

exports.getDepartamentoById = async (req, res) => {
  const departamentoId = req.params.departamentoId; // ID do departamento a ser buscado

  try {
    const departamento = await Departamento.findByPk(departamentoId);
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento não encontrado' });
    }
    res.json(departamento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar departamento por ID' });
  }
};

exports.updateDepartamento = async (req, res) => {
  const departamentoId = req.params.departamentoId; // ID do departamento a ser atualizado
  const { nome, descricao } = req.body;

  try {
    const departamento = await Departamento.findByPk(departamentoId);
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    // Atualiza apenas os campos fornecidos na requisição
    Object.assign(departamento, {
      nome,
      descricao
    });

    await departamento.save();

    res.json({ message: 'Departamento atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar departamento' });
  }
};

exports.deleteDepartamento = async (req, res) => {
  const departamentoId = req.params.departamentoId; // ID do departamento a ser excluído

  try {
    const departamento = await Departamento.findByPk(departamentoId);
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    await departamento.destroy();

    res.json({ message: 'Departamento excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir departamento' });
  }
};

// Adicione outras operações relacionadas ao departamento aqui, se necessário
// Created by António Baptista #(24/08/2023)