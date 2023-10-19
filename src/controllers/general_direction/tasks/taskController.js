const {tasksModel} = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
  async registerTarefa(req, res) {
    const { nome, descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_projeto, id_funcionario } = req.body;

    try {
      const newTarefa = await tasksModel.create({
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
  },

  async getAllTarefas(req, res) {
    try {
      const tarefas = await tasksModel.findAll();
      res.json(tarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  async getTotalTarefas(req, res) {
    try {
      const totalTarefas = await tasksModel.count();
      res.json(totalTarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de tarefas' });
    }
  },

  async getTotalTarefasPorData(req, res) {
    const { dataInicio, dataFim } = req.query;

    try {
      const totalTarefas = await tasksModel.count({
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
  },

  async getTarefaById(req, res) {
    const tarefaId = req.params.tarefaId; // ID da tarefa a ser buscada

    try {
      const tarefa = await tasksModel.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefa por ID' });
    }
  },

  async updateTarefa(req, res) {
    const tarefaId = req.params.tarefaId; // ID da tarefa a ser atualizada
    const { nome, descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_projeto, id_funcionario } = req.body;

    try {
      const tarefa = await tasksModel.findByPk(tarefaId);
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
  },

  async deleteTarefa(req, res) {
    const tarefaId = req.params.tarefaId; // ID da tarefa a ser excluída

    try {
      const tarefa = await tasksModel.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await tarefa.destroy();

      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  },

  // Adicione outras operações relacionadas à tarefa aqui, conforme necessário
};

// Created by António Baptista #(24/08/2023)