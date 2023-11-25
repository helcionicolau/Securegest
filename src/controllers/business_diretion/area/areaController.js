const { areaModel } = require('../../../models/index');

module.exports = {
  async registerArea(req, res) {
    const { nome, descricao } = req.body;

    try {
      const newArea = await areaModel.create({
        nome,
        descricao,
        longitude
      });

      res.status(201).json({ message: 'Área registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar área' });
    }
  },

  async getAllAreas(req, res) {
    try {
      const areas = await areaModel.findAll();
      res.json(areas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar áreas' });
    }
  },

  async getAreaById(req, res) {
    const areaId = req.params.areaId;

    try {
      const area = await areaModel.findByPk(areaId);
      if (!area) {
        return res.status(404).json({ error: 'Área não encontrada' });
      }
      res.json(area);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar área por ID' });
    }
  },

  async updateArea(req, res) {
    const areaId = req.params.areaId;
    const { nome, descricao } = req.body;

    try {
      const area = await areaModel.findByPk(areaId);
      if (!area) {
        return res.status(404).json({ error: 'Área não encontrada' });
      }

      Object.assign(area, {
        nome,
        descricao
      });

      await area.save();

      res.json({ message: 'Área atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar área' });
    }
  },

  async deleteArea(req, res) {
    const areaId = req.params.areaId;

    try {
      const area = await areaModel.findByPk(areaId);
      if (!area) {
        return res.status(404).json({ error: 'Área não encontrada' });
      }

      await area.destroy();

      res.json({ message: 'Área excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir área' });
    }
  },
};
