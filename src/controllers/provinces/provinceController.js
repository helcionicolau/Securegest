// controllers/ProvinciaController.js

const { provinceModel } = require('../../models');

module.exports = {
  async getAllProvincias(req, res) {
    try {
      const provincias = await provinceModel.findAll();
      res.json(provincias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar províncias' });
    }
  },

  async getProvinciaById(req, res) {
    const provinciaId = req.params.provinciaId;

    try {
      const provincia = await provinceModel.findByPk(provinciaId);
      if (!provincia) {
        return res.status(404).json({ error: 'Província não encontrada' });
      }
      res.json(provincia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar província por ID' });
    }
  },

  async getProvinciaByName(req, res) {
    const provinciaName = req.params.provinciaName;

    try {
      const provincia = await provinceModel.findOne({ where: { name: provinciaName } });
      if (!provincia) {
        return res.status(404).json({ error: 'Província não encontrada' });
      }
      res.json(provincia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar província por nome' });
    }
  },
};
