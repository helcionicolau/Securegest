const { sectorModel, zoneModel } = require('../../../models/index');

module.exports = {
  async registerSector(req, res) {
    const { nome, descricao, id_zona } = req.body;

    try {
      const newSector = await sectorModel.create({
        nome,
        descricao,
        id_zona,
      });

      res.status(201).json({ message: 'Setor registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar setor' });
    }
  },

  async getAllSectors(req, res) {
    try {
      const sectors = await sectorModel.findAll({
        include: [{ model: zoneModel, as: 'zona' }],
      });

      // Mapeie os resultados para incluir os detalhes da zona
      const mappedSectors = sectors.map(sector => ({
        id_sector: sector.id_sector,
        nome: sector.nome,
        descricao: sector.descricao,
        id_zona: sector.id_zona,
        zona: sector.zona ? {
          id_zona: sector.zona.id_zona,
          nome: sector.zona.nome,
          descricao: sector.zona.descricao,
        } : null,
      }));

      res.json(mappedSectors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar setores' });
    }
  },

  async getSectorById(req, res) {
    const sectorId = req.params.sectorId;

    try {
      const sector = await sectorModel.findByPk(sectorId, {
        include: [{ model: zoneModel, as: 'zona' }],
      });

      if (!sector) {
        return res.status(404).json({ error: 'Setor não encontrado' });
      }

      res.json(sector);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar setor por ID' });
    }
  },

  async updateSector(req, res) {
    const sectorId = req.params.sectorId;
    const { nome, descricao, id_zona } = req.body;

    try {
      const sector = await sectorModel.findByPk(sectorId);
      if (!sector) {
        return res.status(404).json({ error: 'Setor não encontrado' });
      }

      await sector.update({ nome, descricao, id_zona });

      res.json({ message: 'Setor atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar setor' });
    }
  },

  async deleteSector(req, res) {
    const sectorId = req.params.sectorId;

    try {
      await sectorModel.destroy({ where: { id_sector: sectorId } });

      res.json({ message: 'Setor excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir setor' });
    }
  },

  async getSectorsByZonaId(req, res) {
    const zonaId = req.params.zonaId;
  
    try {
      const sectors = await sectorModel.findAll({
        where: { id_zona: zonaId },
        include: [{ model: zonaModel, as: 'zona' }],
        order: [['nome', 'ASC']]
      });
  
      if (!sectors.length) {
        return res.status(404).json({ error: 'Nenhum setor encontrado para a zona informada' });
      }
  
      res.json(sectors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar setores por zona' });
    }
  }

};

  