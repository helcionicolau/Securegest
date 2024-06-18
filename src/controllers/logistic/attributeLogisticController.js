const { attributeLogisticModel, logisticModel, postModel, employeesModel, groupLogisticModel } = require('../../models');

module.exports = {

  async createAttributeLogistic(req, res) {
    const { id_logistica, id_conjunto, id_posto, id_funcionario } = req.body;

    try {
      const novaAtribuicao = await attributeLogisticModel.create({
        id_logistica,
        id_conjunto,
        id_posto,
        id_funcionario,
      });
      res.status( 201 ).json( { message: 'Atribuição de Material criada com sucesso!' } );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar registro de atribuição de logística' });
    }
  },

  async getAllAttributeLogistics(req, res) {
    try {
      const atribuicoes = await attributeLogisticModel.findAll({
        include: [
          { model: logisticModel, as: 'logistica' },
          { model: groupLogisticModel, as: 'conjunto' },
          { model: postModel, as: 'posto' },
          { model: employeesModel, as: 'funcionario' },
        ],
      });
      res.json(atribuicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de atribuição de logística' });
    }
  },

  async getAttributeLogisticById(req, res) {
    const atribuicaoId = req.params.atribuicaoId;

    try {
      const atribuicao = await attributeLogisticModel.findByPk(atribuicaoId, {
        include: [
          { model: logisticModel, as: 'logistica' },
          { model: groupLogisticModel, as: 'conjunto' },
          { model: postModel, as: 'posto' },
          { model: employeesModel, as: 'funcionario' },
        ],
      });
      if (!atribuicao) {
        return res.status(404).json({ error: 'Registro de atribuição de logística não encontrado' });
      }
      res.json(atribuicao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registro de atribuição de logística por ID' });
    }
  },

  async getAttributeLogisticsByPostId(req, res) {
    const postId = req.params.postId;

    try {
      const atribuicoes = await attributeLogisticModel.findAll({
        where: { id_posto: postId },
        include: [
          { model: logisticModel, as: 'logistica' },
          { model: groupLogisticModel, as: 'conjunto' },
          { model: postModel, as: 'posto' },
          { model: employeesModel, as: 'funcionario' },
        ],
      });
      if (!atribuicoes.length) {
        return res.status(404).json({ error: 'Nenhum registro de atribuição de logística encontrado para o posto' });
      }
      res.json(atribuicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de atribuição de logística por ID do posto' });
    }
  },

  async getAttributeLogisticsByEmployeeId(req, res) {
    const employeeId = req.params.employeeId;

    try {
      const atribuicoes = await attributeLogisticModel.findAll({
        where: { id_funcionario: employeeId },
        include: [
          { model: logisticModel, as: 'logistica' },
          { model: groupLogisticModel, as: 'conjunto' },
          { model: postModel, as: 'posto' },
          { model: employeesModel, as: 'funcionario' },
        ],
      });
      if (!atribuicoes.length) {
        return res.status(404).json({ error: 'Nenhum registro de atribuição de logística encontrado para o funcionário' });
      }
      res.json(atribuicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de atribuição de logística por ID do funcionário' });
    }
  },

  async getAttributeLogisticsByLogisticId(req, res) {
    const logisticId = req.params.logisticId;

    try {
      const atribuicoes = await attributeLogisticModel.findAll({
        where: { id_logistica: logisticId },
        include: [
          { model: logisticModel, as: 'logistica' },
          { model: groupLogisticModel, as: 'conjunto' },
          { model: postModel, as: 'posto' },
          { model: employeesModel, as: 'funcionario' },
        ],
      });
      if (!atribuicoes.length) {
        return res.status(404).json({ error: 'Nenhum registro de atribuição de logística encontrado para a logística' });
      }
      res.json(atribuicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de atribuição de logística por ID da logística' });
    }
  },

  async getAttributeLogisticsByGroupId(req, res) {
    const groupId = req.params.groupId;

    try {
      const atribuicoes = await attributeLogisticModel.findAll({
        where: { id_conjunto: groupId },
        include: [
          { model: logisticModel, as: 'logistica' },
          { model: groupLogisticModel, as: 'conjunto' },
          { model: postModel, as: 'posto' },
          { model: employeesModel, as: 'funcionario' },
        ],
      });
      if (!atribuicoes.length) {
        return res.status(404).json({ error: 'Nenhum registro de atribuição de logística encontrado para o grupo' });
      }
      res.json(atribuicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de atribuição de logística por ID do conjunto' });
    }
  },

  async updateAttributeLogistic(req, res) {
    const atribuicaoId = req.params.atribuicaoId;

    try {
      const atribuicao = await attributeLogisticModel.findByPk(atribuicaoId);
      if (!atribuicao) {
        return res.status(404).json({ error: 'Registro de atribuição de logística não encontrado' });
      }

      // Update only the fields provided in the request body
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          atribuicao[field] = req.body[field];
        }
      });

      await atribuicao.save();

      res.json({ message: 'Registro de atribuição de logística atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar registro de atribuição de logística' });
    }
  },

  async deleteAttributeLogistic(req, res) {
    const atribuicaoId = req.params.atribuicaoId;

    try {
      const atribuicao = await attributeLogisticModel.findByPk(atribuicaoId);
      if (!atribuicao) {
        return res.status(404).json({ error: 'Registro de atribuição de logística não encontrado' });
      }

      await atribuicao.destroy();

      res.json({ message: 'Registro de atribuição de logística excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir registro de atribuição de logística' });
    }
  },
};
