const { logisticModel, categoryLogisticModel, providerModel } = require('../../models');

module.exports = {
  async createLogistica(req, res) {
    const { material, descricao, n_materiais, data_aquisicao, id_categoria, id_provedora } = req.body;

    try {
      const novaLogistica = await logisticModel.create({
        material,
        descricao,
        n_materiais,
        data_aquisicao,
        id_categoria,
        id_provedora,
      });
      res.status(201).json({ novaLogistica });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar registro de logística' });
    }
  },

  async getAllLogisticas(req, res) {
    try {
      const logisticas = await logisticModel.findAll({
        include: [
          { model: categoryLogisticModel, as: 'categoria' },
          { model: providerModel, as: 'provedora' },
        ],
      });
      res.json(logisticas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de logística' });
    }
  },

  async getLogisticaById(req, res) {
    const logisticaId = req.params.logisticaId;

    try {
      const logistica = await logisticModel.findByPk(logisticaId, {
        include: [
          { model: categoryLogisticModel, as: 'categoria' },
          { model: providerModel, as: 'provedora' },
        ],
      });
      if (!logistica) {
        return res.status(404).json({ error: 'Registro de logística não encontrado' });
      }
      res.json(logistica);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registro de logística por ID' });
    }
  },

  async getEquipmentLogisticsCount(req, res) {
    try {
      const count = await logisticModel.count({
        include: [
          {
            model: categoryLogisticModel,
            as: 'categoria',
            where: {
              nome: 'Equipamento Operacional',
            },
          },
        ],
      });
      res.json({ totalEquipamentoOperacional: count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar contagem de Equipamento Operacional' });
    }
  },

  async getArmamentLogisticsCount(req, res) {
    try {
      const count = await logisticModel.count({
        include: [
          {
            model: categoryLogisticModel,
            as: 'categoria',
            where: {
              nome: 'Armamento',
            },
          },
        ],
      });
      res.json({ totalArmamento: count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar contagem de Armamento' });
    }
  },

  async updateLogistica(req, res) {
    const logisticaId = req.params.logisticaId;

    try {
      const logistica = await logisticModel.findByPk(logisticaId);
      if (!logistica) {
        return res.status(404).json({ error: 'Registro de logística não encontrado' });
      }

      // Update only the fields provided in the request body
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          logistica[field] = req.body[field];
        }
      });

      await logistica.save();

      res.json({ message: 'Registro de logística atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar registro de logística' });
    }
  },

  async deleteLogistica(req, res) {
    const logisticaId = req.params.logisticaId;

    try {
      const logistica = await logisticModel.findByPk(logisticaId);
      if (!logistica) {
        return res.status(404).json({ error: 'Registro de logística não encontrado' });
      }

      await logistica.destroy();

      res.json({ message: 'Registro de logística excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir registro de logística' });
    }
  },
};