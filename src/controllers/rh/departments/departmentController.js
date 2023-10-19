const {departamentsModel} = require('../../../models/index');

module.exports = {
  async registerDepartamento(req, res) {
    const { nome, descricao } = req.body;

    try {
      const newDepartamento = await departamentsModel.create({
        nome,
        descricao
      });

      res.status(201).json({ message: 'Departamento registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar departamento' });
    }
  },

  async getAllDepartamentos(req, res) {
    try {
      const departamentos = await departamentsModel.findAll();
      res.json(departamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar departamentos' });
    }
  },

  async getTotalDepartamentos(req, res) {
    try {
      const totalDepartamentos = await departamentsModel.count();
      res.json(totalDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de departamentos' });
    }
  },

  async getDepartamentoById(req, res) {
    const departamentoId = req.params.departamentoId;

    try {
      const departamento = await departamentsModel.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ error: 'Departamento não encontrado' });
      }
      res.json(departamento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar departamento por ID' });
    }
  },

  async updateDepartamento(req, res) {
    const departamentoId = req.params.departamentoId;
    const { nome, descricao } = req.body;

    try {
      const departamento = await departamentsModel.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ error: 'Departamento não encontrado' });
      }

      Object.assign(departamento, {
        nome,
        descricao
      });

      await departamento.save();

      res.json({ message: 'Departamento atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar departamento' });
    }
  },

  async deleteDepartamento(req, res) {
    const departamentoId = req.params.departamentoId;

    try {
      const departamento = await departamentsModel.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ error: 'Departamento não encontrado' });
      }

      await departamento.destroy();

      res.json({ message: 'Departamento excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir departamento' });
    }
  }
};

// Adicione outras operações relacionadas ao departamento aqui, se necessário
// Created by António Baptista #(24/08/2023)