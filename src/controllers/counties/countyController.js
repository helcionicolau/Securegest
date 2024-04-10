// controllers/MunicipioController.js
const { countyModel, provinceModel } = require('../../models');

module.exports = {
  async getAllMunicipios(req, res) {
    try {
      const municipios = await countyModel.findAll({
        include: [{ model: provinceModel, as: 'provincia' }]
      });

      res.json(municipios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar municípios' });
    }
  },

  async getMunicipioById(req, res) {
    const municipioId = req.params.municipioId;

    try {
      const municipio = await countyModel.findByPk(municipioId, { include: [{ model: provinceModel, as: 'provincia' }] });
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
      const municipio = await countyModel.findOne({
        where: { name: municipioName },
        include: [{ model: provinceModel, as: 'provincia' }]
      });
      if (!municipio) {
        return res.status(404).json({ error: 'Município não encontrado' });
      }

      res.json(municipio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar município por nome' });
    }
  },

  async getMunicipioByProvinciaId(req, res) {
    const provinciaId = req.params.provinciaId;

    try {
      // Consulte os municípios filtrando pelo ID da província
      const municipios = await countyModel.findAll({
        where: { provincia_id: provinciaId },
        include: [{ model: provinceModel, as: 'provincia' }]
      });

      res.json(municipios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar municípios por ID de província' });
    }
  },
};
