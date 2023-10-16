const Tarefa = require('../../../models/general_diretion/tasks/Task');
const { Op } = require('sequelize');

exports.registerTarefa = async (req, res) => {
  const { nome, descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_projeto, id_funcionario } = req.body;

  try {
    const newTarefa = await Tarefa.create({
      nome,
      descricao,
      data_inicio,
      data_fim_prevista,
      estado_tarefa,
      progresso,
      id_projeto,
      id_funcionario
    });

    res.status(201).json({ message: 'Tarefa registrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar tarefa' });
  }
};

exports.getAllTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

exports.getTotalTarefas = async (req, res) => {
  try {
    // Obtém o número total de tarefas usando a função count do Sequelize
    const totalTarefas = await Tarefa.count();
    
    res.json(totalTarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de tarefas' });
  }
};

exports.getTotalTarefasPorData = async (req, res) => {
  const { dataInicio, dataFim } = req.query;

  try {
    // Use a função count do Sequelize para obter o número total de tarefas com base nas datas fornecidas
    const totalTarefas = await Tarefa.count({
      where: {
        data_inicio: {
          [Op.between]: [dataInicio, dataFim],
        },
      },
    });

    res.json(totalTarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de tarefas por data' });
  }
};

exports.getTarefaById = async (req, res) => {
  const tarefaId = req.params.tarefaId; // ID da tarefa a ser buscada

  try {
    const tarefa = await Tarefa.findByPk(tarefaId);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tarefa por ID' });
  }
};

exports.updateTarefa = async (req, res) => {
  const tarefaId = req.params.tarefaId; // ID da tarefa a ser atualizada
  const { nome, descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_projeto, id_funcionario } = req.body;

  try {
    const tarefa = await Tarefa.findByPk(tarefaId);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    // Atualiza apenas os campos fornecidos na requisição
    Object.assign(tarefa, {
      nome,
      descricao,
      data_inicio,
      data_fim_prevista,
      estado_tarefa,
      progresso,
      id_projeto,
      id_funcionario
    });

    await tarefa.save();

    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

exports.deleteTarefa = async (req, res) => {
  const tarefaId = req.params.tarefaId; // ID da tarefa a ser excluída

  try {
    const tarefa = await Tarefa.findByPk(tarefaId);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await tarefa.destroy();

    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};

// Adicione outras operações relacionadas à tarefa aqui, conforme necessário
// Created by António Baptista #(24/08/2023)