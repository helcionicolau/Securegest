const {employee_tasksModel} = require('../../../models/index');

module.exports = {
  async registrarFuncionarioTarefa(req, res) {
    const { id_funcionario, id_tarefa, tarefa, data_associacao } = req.body;

    try {
      const novaFuncionarioTarefa = await employee_tasksModel.create({
        id_funcionario,
        id_tarefa,
        tarefa,
        data_associacao,
      });

      res.status(201).json({ message: 'Atribuição de tarefa ao funcionário registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar atribuição de tarefa ao funcionário' });
    }
  },

  async obterTodasFuncionarioTarefas(req, res) {
    try {
      const funcionarioTarefas = await employee_tasksModel.findAll();
      res.json(funcionarioTarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar atribuições de tarefas a funcionários' });
    }
  },

  async obterTotalFuncionarioTarefas(req, res) {
    try {
      const totalFuncionarioTarefas = await employee_tasksModel.count();
      res.json(totalFuncionarioTarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de atribuições de tarefas a funcionários' });
    }
  },

  async obterFuncionarioTarefaPorId(req, res) {
    const funcionarioTarefaId = req.params.funcionarioTarefaId;

    try {
      const funcionarioTarefa = await employee_tasksModel.findByPk(funcionarioTarefaId);
      if (!funcionarioTarefa) {
        return res.status(404).json({ error: 'Atribuição de tarefa ao funcionário não encontrada' });
      }
      res.json(funcionarioTarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar atribuição de tarefa ao funcionário por ID' });
    }
  },

  async obterTarefasDoFuncionarioPorId(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const tarefasDoFuncionario = await employee_tasksModel.findAll({
        where: { id_funcionario: funcionarioId },
      });

      res.json(tarefasDoFuncionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar atribuições de tarefas do funcionário por ID' });
    }
  },

  async obterTodasFuncionarioTarefasPorIdDaTarefa(req, res) {
    const tarefaId = req.params.tarefaId;

    try {
      const tarefasDoTarefa = await employee_tasksModel.findAll({
        where: { id_tarefa: tarefaId },
      });

      res.json(tarefasDoTarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar atribuições de tarefas pelo ID da tarefa' });
    }
  },

  async atualizarFuncionarioTarefa(req, res) {
    const funcionarioTarefaId = req.params.funcionarioTarefaId;
    const { id_funcionario, id_tarefa, tarefa, data_associacao } = req.body;

    try {
      const funcionarioTarefa = await employee_tasksModel.findByPk(funcionarioTarefaId);
      if (!funcionarioTarefa) {
        return res.status(404).json({ error: 'Atribuição de tarefa ao funcionário não encontrada' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.assign(funcionarioTarefa, { id_funcionario, id_tarefa, tarefa, data_associacao });

      await funcionarioTarefa.save();

      res.json({ message: 'Atribuição de tarefa ao funcionário atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar atribuição de tarefa ao funcionário' });
    }
  },

  async excluirFuncionarioTarefa(req, res) {
    const funcionarioTarefaId = req.params.funcionarioTarefaId;

    try {
      const funcionarioTarefa = await employee_tasksModel.findByPk(funcionarioTarefaId);
      if (!funcionarioTarefa) {
        return res.status(404).json({ error: 'Atribuição de tarefa ao funcionário não encontrada' });
      }

      await funcionarioTarefa.destroy();

      res.json({ message: 'Atribuição de tarefa ao funcionário excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir atribuição de tarefa ao funcionário' });
    }
  },
};

// Created by António Baptista #(24/08/2023)