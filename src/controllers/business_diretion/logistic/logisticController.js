const { logisticModel } = require('../../../models/index');

module.exports = {
  async registerLogistica(req, res) {
    const { material, descricao, id_provedora, n_materiais } = req.body;

    try {
      const newLogistica = await logisticModel.create({
        material,
        descricao,
        id_provedora,
        n_materiais,
      });

      res.status(201).json({ message: 'Logística registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar logística' });
    }
  },

  async getAllLogisticas(req, res) {
    try {
      const logisticas = await logisticModel.findAll();
      res.json(logisticas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar logísticas' });
    }
  },

  async getLogisticaById(req, res) {
    const logisticaId = req.params.logisticaId;

    try {
      const logistica = await logisticModel.findByPk(logisticaId);
      if (!logistica) {
        return res.status(404).json({ error: 'Logística não encontrada' });
      }
      res.json(logistica);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar logística por ID' });
    }
  },

  async updateLogistica(req, res) {
    const logisticaId = req.params.logisticaId;
    const { material, descricao, id_provedora, id_posicao } = req.body;

    try {
      const logistica = await logisticModel.findByPk(logisticaId);
      if (!logistica) {
        return res.status(404).json({ error: 'Logística não encontrada' });
      }

      Object.assign(logistica, {
        material,
        descricao,
        id_provedora,
        n_materiais,
      });

      await logistica.save();

      res.json({ message: 'Logística atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar logística' });
    }
  },

  async deleteLogistica(req, res) {
    const logisticaId = req.params.logisticaId;

    try {
      const logistica = await logisticModel.findByPk(logisticaId);
      if (!logistica) {
        return res.status(404).json({ error: 'Logística não encontrada' });
      }

      await logistica.destroy();

      res.json({ message: 'Logística excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir logística' });
    }
  },
};