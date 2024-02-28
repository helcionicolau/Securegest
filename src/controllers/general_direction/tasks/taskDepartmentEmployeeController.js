const { taskDepartEmploModel, tasksModel, employeesModel, userModel } = require('../../../models/index');

module.exports = {
  async registerTarefaDepartamentoFuncionario(req, res) {
    const { descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_tarefa, id_funcionario } = req.body;

    try {
      const newTarefaDepartamentoFuncionario = await taskDepartEmploModel.create({
        descricao,
        data_inicio,
        data_fim_prevista,
        estado_tarefa,
        progresso,
        id_tarefa,
        id_funcionario
      });

      res.status(201).json({ message: 'Tarefa do departamento do funcionário registrada com sucesso!', tarefa: newTarefaDepartamentoFuncionario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar tarefa do departamento do funcionário' });
    }
  },

  async getAllTarefasDepartamentoFuncionario(req, res) {
    try {
      const tarefasDepartamentoFuncionario = await taskDepartEmploModel.findAll();
      res.json(tarefasDepartamentoFuncionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas do departamento do funcionário' });
    }
  },

  async getTarefaDepartamentoFuncionarioById(req, res) {
    const tarefaDepartamentoFuncionarioId = req.params.tarefaDepartamentoFuncionarioId;

    try {
      const tarefaDepartamentoFuncionario = await taskDepartEmploModel.findByPk(tarefaDepartamentoFuncionarioId);
      if (!tarefaDepartamentoFuncionario) {
        return res.status(404).json({ error: 'Tarefa do departamento do funcionário não encontrada' });
      }
      res.json(tarefaDepartamentoFuncionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefa do departamento do funcionário por ID' });
    }
  },

  async getTarefasByTarefaId(req, res) {
    const tarefaId = req.params.tarefaId;

    try {
      const tarefasDepartamentoFuncionario = await taskDepartEmploModel.findAll({
        where: {
          id_tarefa: tarefaId
        }
      });
      if (!tarefasDepartamentoFuncionario || tarefasDepartamentoFuncionario.length === 0) {
        return res.status(404).json({ error: 'Tarefas do departamento do funcionário não encontradas para a tarefa fornecida' });
      }
      res.json(tarefasDepartamentoFuncionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas do departamento do funcionário por ID de tarefa' });
    }
  },

  async getTarefasByFuncionarioId(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const tarefasDepartamentoFuncionario = await taskDepartEmploModel.findAll({
        where: {
          id_funcionario: funcionarioId
        }
      });
      if (!tarefasDepartamentoFuncionario || tarefasDepartamentoFuncionario.length === 0) {
        return res.status(404).json({ error: 'Tarefas do departamento do funcionário não encontradas para o funcionário fornecido' });
      }
      res.json(tarefasDepartamentoFuncionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas do departamento do funcionário por ID de funcionário' });
    }
  },

  async getFuncionariosPorDepartamentoDaTarefa(req, res) {
    const tarefaId = req.params.tarefaId;

    try {
      // Passo 1: Obter o id_departamento da tarefa
      const tarefa = await tasksModel.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      const idDepartamento = tarefa.id_departamento;

      // Passo 2: Buscar todos os funcionários cujo departamento_id corresponde ao id_departamento da tarefa
      const funcionarios = await employeesModel.findAll({
        where: {
          departamento_id: idDepartamento,
        },
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários por departamento da tarefa' });
    }
  },

  async updateTarefaDepartamentoFuncionario(req, res) {
    const tarefaDepartamentoFuncionarioId = req.params.tarefaDepartamentoFuncionarioId;
    const { descricao, data_inicio, data_fim_prevista, estado_tarefa, progresso, id_tarefa, id_funcionario } = req.body;

    try {
      const tarefaDepartamentoFuncionario = await taskDepartEmploModel.findByPk(tarefaDepartamentoFuncionarioId);
      if (!tarefaDepartamentoFuncionario) {
        return res.status(404).json({ error: 'Tarefa do departamento do funcionário não encontrada' });
      }

      Object.assign(tarefaDepartamentoFuncionario, {
        descricao,
        data_inicio,
        data_fim_prevista,
        estado_tarefa,
        progresso,
        id_tarefa,
        id_funcionario
      });

      await tarefaDepartamentoFuncionario.save();

      res.json({ message: 'Tarefa do departamento do funcionário atualizada com sucesso', tarefa: tarefaDepartamentoFuncionario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa do departamento do funcionário' });
    }
  },

  async deleteTarefaDepartamentoFuncionario(req, res) {
    const tarefaDepartamentoFuncionarioId = req.params.tarefaDepartamentoFuncionarioId;

    try {
      const tarefaDepartamentoFuncionario = await taskDepartEmploModel.findByPk(tarefaDepartamentoFuncionarioId);
      if (!tarefaDepartamentoFuncionario) {
        return res.status(404).json({ error: 'Tarefa do departamento do funcionário não encontrada' });
      }

      await tarefaDepartamentoFuncionario.destroy();

      res.json({ message: 'Tarefa do departamento do funcionário excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir tarefa do departamento do funcionário' });
    }
  },
};
