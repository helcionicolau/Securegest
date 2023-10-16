const Funcionario = require('../../../models/rh/employees/Employee');
const { Op } = require('sequelize');


exports.registerFuncionario = async (req, res) => {
  const { nome, sexo, estado_civil, data_nascimento, nif, cargo, data_contratacao, salario, departamento_id, carga_horaria_diaria } = req.body;

  try {
    const newFuncionario = await Funcionario.create({
      nome,
      sexo,
      estado_civil,
      data_nascimento,
      nif,
      cargo,
      data_contratacao,
      salario,
      departamento_id,
      data_registro: new Date(),
      carga_horaria_diaria
    });

    res.status(201).json({ message: 'Funcionário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar funcionário' });
  }
};

exports.getAllFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};

exports.getTotalFuncionarios = async (req, res) => {
  try {
    // Obtém o número total de funcionários usando a função count do Sequelize
    const totalFuncionarios = await Funcionario.count();
    
    res.json( totalFuncionarios );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de funcionários' });
  }
};

exports.getTotalFuncionariosPorData = async (req, res) => {
  const { dataInicio, dataFim } = req.query;

  try {
    // Use a função count do Sequelize para obter o número total de funcionários com base nas datas fornecidas
    const totalFuncionarios = await Funcionario.count({
      where: {
        data_registro: {
          [Op.between]: [dataInicio, dataFim],
        },
      },
    });

    res.json(totalFuncionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de funcionários por data' });
  }
};

exports.getFuncionarioById = async (req, res) => {
  const funcionarioId = req.params.funcionarioId; // ID do funcionário a ser buscado

  try {
    const funcionario = await Funcionario.findByPk(funcionarioId);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar funcionário por ID' });
  }
};

// Define um novo endpoint para obter funcionários por id_departamento
exports.getFuncionariosByDepartamento = async (req, res) => {
  const departamentoId = req.params.departamentoId; // ID do departamento a ser filtrado

  try {
    // Use a função findAll do Sequelize para obter todos os funcionários com o departamento_id correspondente
    const funcionarios = await Funcionario.findAll({
      where: {
        departamento_id: departamentoId,
      },
    });

    res.json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar funcionários por departamento' });
  }
};

exports.updateFuncionario = async (req, res) => {
  const funcionarioId = req.params.funcionarioId; // ID do funcionário a ser atualizado
  const { nome, sexo, estado_civil, data_nascimento, nif, cargo, data_contratacao, salario, departamento_id, carga_horaria_diaria } = req.body;

  try {
    const funcionario = await Funcionario.findByPk(funcionarioId);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    // Atualiza apenas os campos fornecidos na requisição
    Object.assign(funcionario, {
      nome,
      sexo,
      estado_civil,
      data_nascimento,
      nif,
      cargo,
      data_contratacao,
      salario,
      departamento_id,
      carga_horaria_diaria
    });

    await funcionario.save();

    res.json({ message: 'Funcionário atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
};

exports.deleteFuncionario = async (req, res) => {
  const funcionarioId = req.params.funcionarioId; // ID do funcionário a ser excluído

  try {
    const funcionario = await Funcionario.findByPk(funcionarioId);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    await funcionario.destroy();

    res.json({ message: 'Funcionário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir funcionário' });
  }
};

// Adicione outras operações relacionadas ao funcionário aqui, como atualização de perfil e uploads de imagem
// Created by António Baptista #(24/08/2023)
