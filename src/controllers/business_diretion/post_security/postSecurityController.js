const { employeePostModel, employeesModel, postModel } = require('../../../models/index');

module.exports = {
  async createPostoSeguranca(req, res) {
    const { id_funcionario, id_posto, tempo_entrada, tempo_saida } = req.body;

    try {
      const novoPostoSeguranca = await employeePostModel.create({
        id_funcionario,
        id_posto,
        tempo_entrada,
        tempo_saida,
      });

      res.status(201).json({ novoPostoSeguranca });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nova posto_seguranca' });
    }
  },

  async getAllPostoSegurancas(req, res) {
    try {
      const postoSegurancas = await employeePostModel.findAll({
        include: [{ model: employeesModel, as: 'funcionario' }, { model: postModel, as: 'posto' }],
      });

      res.json(postoSegurancas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posto_segurancas' });
    }
  },

  async getPostoSegurancaById(req, res) {
    const postoSegurancaId = req.params.postoSegurancaId;

    try {
      const postoSeguranca = await employeePostModel.findByPk(postoSegurancaId, {
        include: [{ model: employeesModel, as: 'funcionario' }, { model: postModel, as: 'posto' }],
      });

      if (!postoSeguranca) {
        return res.status(404).json({ error: 'PostoSeguranca não encontrado' });
      }

      res.json(postoSeguranca);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posto_seguranca por ID' });
    }
  },

  async updatePostoSeguranca(req, res) {
    const postoSegurancaId = req.params.postoSegurancaId;
    const updateFields = req.body;

    try {
      const postoSeguranca = await employeePostModel.findByPk(postoSegurancaId);

      if (!postoSeguranca) {
        return res.status(404).json({ error: 'PostoSeguranca não encontrado' });
      }

      // Update only the fields provided in the request
      Object.keys(updateFields).forEach((field) => {
        if (updateFields[field] !== undefined) {
          postoSeguranca[field] = updateFields[field];
        }
      });

      await postoSeguranca.save();

      res.json({ message: 'PostoSeguranca atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar posto_seguranca' });
    }
  },

  async getPostoSegurancaByPostoId(req, res) {
    const postoId = req.params.postoId;

    try {
      const postoSegurancas = await employeePostModel.findAll({
        where: { id_posto: postoId },
        include: [{ model: employeesModel, as: 'funcionario' }, { model: postModel, as: 'posto' }],
      });

      if (!postoSegurancas.length) {
        return res.status(404).json({ error: 'Nenhum posto_seguranca encontrado para o posto informado' });
      }

      res.json(postoSegurancas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posto_seguranca por ID do posto' });
    }
  },

  async getPostoSegurancaByFuncionarioId(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const postoSegurancas = await employeePostModel.findAll({
        where: { id_funcionario: funcionarioId },
        include: [{ model: employeesModel, as: 'funcionario' }, { model: postModel, as: 'posto' }],
      });

      if (!postoSegurancas.length) {
        return res.status(404).json({ error: 'Nenhum posto_seguranca encontrado para o funcionário informado' });
      }

      res.json(postoSegurancas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posto_seguranca por ID do funcionário' });
    }
  },

  async deletePostoSeguranca(req, res) {
    const postoSegurancaId = req.params.postoSegurancaId;

    try {
      const postoSeguranca = await employeePostModel.findByPk(postoSegurancaId);

      if (!postoSeguranca) {
        return res.status(404).json({ error: 'PostoSeguranca não encontrado' });
      }

      await postoSeguranca.destroy();

      res.json({ message: 'PostoSeguranca excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir posto_seguranca' });
    }
  },
};
