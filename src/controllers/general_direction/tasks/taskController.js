const { tasksModel } = require('../../../models/index');

module.exports = {
  async registerTarefa(req, res) {
    const { nome, descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_projeto, id_departamento } = req.body;

    try {
      const newTarefa = await tasksModel.create({
        nome,
        descricao,
        data_inicio,
        data_fim_prevista,
        estado_tarefa,
        progresso,
        id_projeto,
        id_departamento
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

  async getTarefaById(req, res) {
    const tarefaId = req.params.tarefaId;

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

  async getTarefasByDepartamentoId(req, res) {
    const departamentoId = req.params.departamentoId;

    try {
      const tarefas = await tasksModel.findAll({
        where: {
          id_departamento: departamentoId
        }
      });
      if (!tarefas || tarefas.length === 0) {
        return res.status(404).json({ error: 'Tarefas não encontradas para o departamento fornecido' });
      }
      res.json(tarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas por ID de departamento' });
    }
  },

  async getTarefasByProjetoId(req, res) {
    const projetoId = req.params.projetoId;

    try {
      const tarefas = await tasksModel.findAll({
        where: {
          id_projeto: projetoId
        }
      });
      if (!tarefas || tarefas.length === 0) {
        return res.status(404).json({ error: 'Tarefas não encontradas para o projeto fornecido' });
      }
      res.json(tarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas por ID de projeto' });
    }
  },

  async updateTarefa(req, res) {
    const tarefaId = req.params.tarefaId;
    const { nome, descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_projeto, id_departamento } = req.body;

    try {
      const tarefa = await tasksModel.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      Object.assign(tarefa, {
        nome,
        descricao,
        data_inicio,
        data_fim_prevista,
        estado_tarefa,
        progresso,
        id_projeto,
        id_departamento
      });

      await tarefa.save();

      res.json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  async deleteTarefa(req, res) {
    const tarefaId = req.params.tarefaId;

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
};
