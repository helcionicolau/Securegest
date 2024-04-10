const { zoneModel, areaModel } = require('../../../models/index');

module.exports = {
  async registerZona(req, res) {
    const { nome, descricao, id_area } = req.body;

    try {
      const newZona = await zoneModel.create({
        nome,
        descricao,
        id_area,
      });

      res.status(201).json({ message: 'Zona registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar zona' });
    }
  },

  async getAllZonas(req, res) {
    try {
      const zonas = await zoneModel.findAll({
        include: [{ model: areaModel, as: 'area' }]
      });

      // Mapeie os resultados para incluir os detalhes da área
      const mappedZonas = zonas.map(zona => ({
        id_zona: zona.id_zona,
        nome: zona.nome,
        descricao: zona.descricao,
        id_area: zona.id_area,
        area: zona.area ? {
          id_area: zona.area.id_area,
          nome: zona.area.nome,
          descricao: zona.area.descricao,
        } : null,
      }));

      res.json(mappedZonas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar zonas' });
    }
  },

  async getZonaById(req, res) {
    const zonaId = req.params.zonaId;

    try {
      const zona = await zoneModel.findByPk(zonaId, { include: [{ model: areaModel, as: 'area' }] });
      if (!zona) {
        return res.status(404).json({ error: 'Zona não encontrada' });
      }
      
      // Mapeie os resultados para incluir os detalhes da área
      const mappedZona = {
        id_zona: zona.id_zona,
        nome: zona.nome,
        descricao: zona.descricao,
        id_area: zona.id_area,
        area: zona.area ? {
          id_area: zona.area.id_area,
          nome: zona.area.nome,
          descricao: zona.area.descricao,
        } : null,
      };

      res.json(mappedZona);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar zona por ID' });
    }
  },

  async updateZona(req, res) {
    const zonaId = req.params.zonaId;
    const { nome, descricao, id_area } = req.body;

    try {
      const zona = await zoneModel.findByPk(zonaId);
      if (!zona) {
        return res.status(404).json({ error: 'Zona não encontrada' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          zona[field] = req.body[field];
        }
      });

      await zona.save();

      res.json({ message: 'Zona atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar zona' });
    }
  },

  async deleteZona(req, res) {
    const zonaId = req.params.zonaId;

    try {
      const zona = await zoneModel.findByPk(zonaId);
      if (!zona) {
        return res.status(404).json({ error: 'Zona não encontrada' });
      }

      await zona.destroy();

      res.json({ message: 'Zona excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir zona' });
    }
  },
};
