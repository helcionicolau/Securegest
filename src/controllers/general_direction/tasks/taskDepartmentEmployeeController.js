const { taskDepartEmploModel, tasksModel, employeesModel, userModel, userProfileModel } = require('../../../models/index');

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
      const idDepartamentoTarefa = tarefa.id_departamento;
  
      // Passo 2: Verificar o perfil do usuário atual
      const userId = req.userData.userId;
      const userProfile = await userProfileModel.findByPk(userId);
  
      // Passo 3: Verificar se o usuário tem permissão para visualizar com base no perfil
      if (userProfile) {
        // Se o perfil do usuário for 3 ou 4, ele pode visualizar todos os funcionários
        if (userProfile.id_perfil === 3 || userProfile.id_perfil === 4) {
          const funcionarios = await employeesModel.findAll();
          return res.json(funcionarios);
        }
        
        // Se o id_departamento do usuário for igual ao da tarefa, ele pode visualizar
        if (userProfile.id_departamento === idDepartamentoTarefa) {
          const funcionarios = await employeesModel.findAll({
            where: {
              departamento_id: idDepartamentoTarefa
            }
          });
          return res.json(funcionarios);
        }
      }
  
      // Se o perfil do usuário não for 3, 4 ou o departamento não corresponder, retornar uma resposta sem conteúdo
      return res.status(403).json({ error: 'Acesso não autorizado' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar funcionários por departamento da tarefa' });
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
