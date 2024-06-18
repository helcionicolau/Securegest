const { groupLogisticModel, logisticModel } = require('../../models');

module.exports = {

  async createGroup(req, res) {
    const { descricao, id_logistica } = req.body;

    try {
      const novoGrupo = await groupLogisticModel.create({
        descricao,
        id_logistica,
      });
      res.status( 201 ).json( { message: 'Conjunto de Material criado com sucesso!' } );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar registro de conjunto de logística' });
    }
  },

  async getAllGroups(req, res) {
    try {
      const grupos = await groupLogisticModel.findAll({
        include: [
          { model: logisticModel, as: 'logistica' }
        ],
      });
      res.json(grupos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de conjuntos de logística' });
    }
  },

  async getGroupById(req, res) {
    const grupoId = req.params.grupoId;

    try {
      const grupo = await groupLogisticModel.findByPk(grupoId, {
        include: [
          { model: logisticModel, as: 'logistica' }
        ],
      });
      if (!grupo) {
        return res.status(404).json({ error: 'Registro de conjunto de logística não encontrado' });
      }
      res.json(grupo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registro de conjunto de logística por ID' });
    }
  },

  async getGroupByLogisticId(req, res) {
    const logisticId = req.params.logisticId;

    try {
      const grupos = await groupLogisticModel.findAll({
        where: { id_logistica: logisticId },
        include: [
            { model: logisticModel, as: 'logistica' }
        ],
      });
      if (!grupos.length) {
        return res.status(404).json({ error: 'Nenhum registro de conjunto de logística encontrado para a logística' });
      }
      res.json(grupos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de conjunto de logística por ID da logística' });
    }
  },

  async updateGroup(req, res) {
    const grupoId = req.params.grupoId;

    try {
      const grupo = await groupLogisticModel.findByPk(grupoId);
      if (!grupo) {
        return res.status(404).json({ error: 'Registro de conjunto de logística não encontrado' });
      }

      // Update only the fields provided in the request body
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          grupo[field] = req.body[field];
        }
      });

      await grupo.save();

      res.json({ message: 'Registro de conjunto de logística atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar registro de conjunto de logística' });
    }
  },

  async deleteGroup(req, res) {
    const grupoId = req.params.grupoId;

    try {
      const grupo = await groupLogisticModel.findByPk(grupoId);
      if (!grupo) {
        return res.status(404).json({ error: 'Registro de conjunto de logística não encontrado' });
      }

      await grupo.destroy();

      res.json({ message: 'Registro de conjunto de logística excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir conjunto de atribuição de logística' });
    }
  },
};
