// controllers/MunicipioController.js
const { countyModel } = require('../../models');

module.exports = {
  async getAllMunicipios(req, res) {
    try {
      const municipios = await countyModel.findAll();
      res.json(municipios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar municípios' });
    }
  },

  async getMunicipioById(req, res) {
    const municipioId = req.params.municipioId;

    try {
      const municipio = await countyModel.findByPk(municipioId);
      if (!municipio) {
        return res.status(404).json({ error: 'Município não encontrado' });
      }
      res.json(municipio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar município por ID' });
    }
  },

  async getMunicipioByName(req, res) {
    const municipioName = req.params.municipioName;

    try {
      const municipio = await countyModel.findOne({ where: { name: municipioName } });
      if (!municipio) {
        return res.status(404).json({ error: 'Município não encontrado' });
      }
      res.json(municipio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar município por nome' });
    }
  },
};
