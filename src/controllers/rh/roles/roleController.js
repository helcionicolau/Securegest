const { rolesModel } = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
  async registerCargo(req, res) {
    const { nome, descricao } = req.body;

    try {
      const newCargo = await rolesModel.create({
        nome,
        descricao,
      });

      res.status(201).json({ message: 'Cargo registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar cargo' });
    }
  },

  async getAllCargos(req, res) {
    try {
      const cargos = await rolesModel.findAll();
      res.json(cargos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar cargos' });
    }
  },

  async getCargoById(req, res) {
    const cargoId = req.params.cargoId;

    try {
      const cargo = await rolesModel.findByPk(cargoId);
      if (!cargo) {
        return res.status(404).json({ error: 'Cargo não encontrado' });
      }
      res.json(cargo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar cargo por ID' });
    }
  },

  async updateCargo(req, res) {
    const cargoId = req.params.cargoId;
    const { nome, descricao } = req.body;

    try {
      const cargo = await rolesModel.findByPk(cargoId);
      if (!cargo) {
        return res.status(404).json({ error: 'Cargo não encontrado' });
      }

      Object.assign(cargo, {
        nome,
        descricao,
      });

      await cargo.save();

      res.json({ message: 'Cargo atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar cargo' });
    }
  },

  async deleteCargo(req, res) {
    const cargoId = req.params.cargoId;

    try {
      const cargo = await rolesModel.findByPk(cargoId);
      if (!cargo) {
        return res.status(404).json({ error: 'Cargo não encontrado' });
      }

      await cargo.destroy();

      res.json({ message: 'Cargo excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir cargo' });
    }
  },
};
