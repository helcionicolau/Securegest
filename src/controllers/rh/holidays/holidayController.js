const {holidaysModel} = require('../../../models/index');

module.exports = {
  async registerFeria(req, res) {
    const { nome, data_inicio, data_fim, numero_de_dias, ano } = req.body;

    try {
      const newFeria = await holidaysModel.create({
        nome,
        data_inicio,
        data_fim,
        numero_de_dias,
        ano
      });

      res.status(201).json({ message: 'Férias registradas com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar férias' });
    }
  },

  async getAllFerias(req, res) {
    try {
      const ferias = await holidaysModel.findAll();
      res.json(ferias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar férias' });
    }
  },

  async getTotalFerias(req, res) {
    try {
      const totalFerias = await holidaysModel.count();
      
      res.json(totalFerias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de férias' });
    }
  },

  async getFeriaById(req, res) {
    const feriasId = req.params.feriasId;

    try {
      const ferias = await holidaysModel.findByPk(feriasId);
      if (!ferias) {
        return res.status(404).json({ error: 'Férias não encontradas' });
      }
      res.json(ferias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar férias por ID' });
    }
  },

  async updateFeria(req, res) {
    const feriasId = req.params.feriasId;
    const { nome, data_inicio, data_fim, numero_de_dias, ano } = req.body;

    try {
      const ferias = await holidaysModel.findByPk(feriasId);
      if (!ferias) {
        return res.status(404).json({ error: 'Férias não encontradas' });
      }

      Object.assign(ferias, {
        nome,
        data_inicio,
        data_fim,
        numero_de_dias,
        ano
      });

      await ferias.save();

      res.json({ message: 'Férias atualizadas com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar férias' });
    }
  },

  async deleteFeria(req, res) {
    const feriasId = req.params.feriasId;

    try {
      const ferias = await holidaysModel.findByPk(feriasId);
      if (!ferias) {
        return res.status(404).json({ error: 'Férias não encontradas' });
      }

      await ferias.destroy();

      res.json({ message: 'Férias excluídas com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir férias' });
    }
  }
};

// Created by António Baptista #(24/08/2023)