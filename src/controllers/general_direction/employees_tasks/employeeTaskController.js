const { employeeTaskModel, projectDepartmentModel, employeesModel } = require('../../../models/index');

module.exports = {
  async createFuncionarioTarefa(req, res) {
    const {
      descricao,
      data_inicio,
      data_fim_prevista,
      estado_tarefa,
      progresso,
      id_projeto_departamento,
      id_funcionario,
    } = req.body;

    try {
      const novaTarefa = await employeeTaskModel.create({
        descricao,
        data_inicio,
        data_fim_prevista,
        estado_tarefa,
        progresso,
        id_projeto_departamento,
        id_funcionario,
      });

      await novaTarefa.reload({ include: [{ model: projectDepartmentModel, as: 'projeto_departamento' }, { model: employeesModel, as: 'funcionario' }] });

      res.status(201).json({ novaTarefa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nova tarefa' });
    }
  },

  async getAllFuncionarioTarefas(req, res) {
    try {
      const tarefas = await employeeTaskModel.findAll({
        include: [{ model: projectDepartmentModel, as: 'projeto_departamento' }, { model: employeesModel, as: 'funcionario' }],
      });

      res.json(tarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  async getFuncionarioTarefaById(req, res) {
    const tarefaId = req.params.tarefaId;

    try {
      const tarefa = await employeeTaskModel.findByPk(tarefaId, {
        include: [{ model: projectDepartmentModel, as: 'projeto_departamento' }, { model: employeesModel, as: 'funcionario' }],
      });

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      res.json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefa por ID' });
    }
  },

  async updateFuncionarioTarefa(req, res) {
    const tarefaId = req.params.tarefaId;
    const updateFields = req.body;

    try {
      const tarefa = await employeeTaskModel.findByPk(tarefaId);

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(updateFields).forEach((field) => {
        if (updateFields[field] !== undefined) {
          tarefa[field] = updateFields[field];
        }
      });

      await tarefa.save();

      await tarefa.reload({ include: [{ model: projectDepartmentModel, as: 'projeto_departamento' }, { model: employeesModel, as: 'funcionario' }] });

      res.json({ message: 'Tarefa atualizada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  async deleteFuncionarioTarefa(req, res) {
    const tarefaId = req.params.tarefaId;

    try {
      const tarefa = await employeeTaskModel.findByPk(tarefaId);

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await tarefa.destroy();

      res.json({ message: 'Tarefa excluída com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  },
};
