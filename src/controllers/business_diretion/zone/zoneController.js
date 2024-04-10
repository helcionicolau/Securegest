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
        include: [{
          model: areaModel,
          as: 'area'
        }]
      });

      // Mapeie os resultados para incluir os campos da tabela relacionada Area
      const mappedZonas = zonas.map(zona => ({
        id_zona: zona.id_zona,
        nome: zona.nome,
        descricao: zona.descricao,
        id_area: zona.id_area,
        area_nome: zona.area ? zona.area.nome : null,
        area_descricao: zona.area ? zona.area.descricao : null,
        created_at: zona.created_at,
        updated_at: zona.updated_at
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
      const zona = await zoneModel.findByPk(zonaId, {
        include: [{
          model: Area,
          as: 'area'
        }]
      });
      if (!zona) {
        return res.status(404).json({ error: 'Zona não encontrada' });
      }

      const mappedZona = {
        id_zona: zona.id_zona,
        nome: zona.nome,
        descricao: zona.descricao,
        id_area: zona.id_area,
        area_nome: zona.area ? zona.area.nome : null,
        area_descricao: zona.area ? zona.area.descricao : null,
        created_at: zona.created_at,
        updated_at: zona.updated_at
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

      Object.assign(zona, {
        nome,
        descricao,
        id_area,
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
