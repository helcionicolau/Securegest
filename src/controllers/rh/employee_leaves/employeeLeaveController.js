const {employee_leavesModel} = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
  async registerFuncionarioSaida(req, res) {
    const {
      id_funcionario,
      id_tipo_saida,
      tipo_saida,
      data_inicio,
      data_fim,
      duracao_saida,
      motivo,
      status_saida
    } = req.body;

    try {
      const newFuncionarioSaida = await employee_leavesModel.create({
        id_funcionario,
        id_tipo_saida,
        tipo_saida,
        data_inicio,
        data_fim,
        duracao_saida,
        data_registro: new Date(),
        motivo,
        status_saida
      });

      res.status(201).json({ message: 'Saída do funcionário registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar saída do funcionário' });
    }
  },

  async getAllFuncionarioSaidas(req, res) {
    try {
      const funcionarioSaidas = await employee_leavesModel.findAll();
      res.json(funcionarioSaidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar saídas do funcionário' });
    }
  },

  async getTotalFuncionarioSaidas(req, res) {
    try {
      const totalFuncionarioSaidas = await employee_leavesModel.count();
      res.json(totalFuncionarioSaidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de saídas de funcionários' });
    }
  },

  async getFuncionarioSaidaById(req, res) {
    const funcionarioSaidaId = req.params.funcionarioSaidaId;

    try {
      const funcionarioSaida = await employee_leavesModel.findByPk(funcionarioSaidaId);
      if (!funcionarioSaida) {
        return res.status(404).json({ error: 'Saída do funcionário não encontrada' });
      }
      res.json(funcionarioSaida);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar saída do funcionário por ID' });
    }
  },

  async updateFuncionarioSaida(req, res) {
    const funcionarioSaidaId = req.params.funcionarioSaidaId;
    const {
      id_funcionario,
      id_tipo_saida,
      tipo_saida,
      data_inicio,
      data_fim,
      duracao_saida,
      motivo,
      status_saida
    } = req.body;

    try {
      const funcionarioSaida = await employee_leavesModel.findByPk(funcionarioSaidaId);
      if (!funcionarioSaida) {
        return res.status(404).json({ error: 'Saída do funcionário não encontrada' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.assign(funcionarioSaida, {
        id_funcionario,
        id_tipo_saida,
        tipo_saida,
        data_inicio,
        data_fim,
        duracao_saida,
        motivo,
        status_saida
      });

      await funcionarioSaida.save();

      res.json({ message: 'Saída do funcionário atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar saída do funcionário' });
    }
  },

  async deleteFuncionarioSaida(req, res) {
    const funcionarioSaidaId = req.params.funcionarioSaidaId;

    try {
      const funcionarioSaida = await employee_leavesModel.findByPk(funcionarioSaidaId);
      if (!funcionarioSaida) {
        return res.status(404).json({ error: 'Saída do funcionário não encontrada' });
      }

      await funcionarioSaida.destroy();

      res.json({ message: 'Saída do funcionário excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir saída do funcionário' });
    }
  }
};

// Created by António Baptista #(24/08/2023)