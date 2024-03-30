const { employeeRolesModel } = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
  async registerFuncionarioCargo(req, res) {
    try {
      const { funcionario_id, cargo_id } = req.body;

      // Verificar se os IDs do funcionário e do cargo foram fornecidos
      if (!funcionario_id || !cargo_id) {
        return res.status(400).json({ error: 'IDs do funcionário e do cargo são necessários' });
      }

      // Criar o registro do cargo do funcionário no banco de dados
      const newFuncionarioCargo = await employeeRolesModel.create({
        funcionario_id,
        cargo_id
      });

      res.status(201).json({ message: 'Cargo do funcionário registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar cargo do funcionário' });
    }
  },

  async getAllFuncionarioCargos(req, res) {
    try {
      const funcionarioCargos = await employeeRolesModel.findAll();
      res.json(funcionarioCargos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar cargos de funcionários' });
    }
  },

  async getFuncionarioCargoById(req, res) {
    const funcionarioCargoId = req.params.funcionarioCargoId; // ID do registro de cargo do funcionário a ser buscado

    try {
      const funcionarioCargo = await employeeRolesModel.findByPk(funcionarioCargoId);
      if (!funcionarioCargo) {
        return res.status(404).json({ error: 'Registro de cargo do funcionário não encontrado' });
      }
      res.json(funcionarioCargo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registro de cargo do funcionário por ID' });
    }
  },

  async deleteFuncionarioCargo(req, res) {
    const funcionarioCargoId = req.params.funcionarioCargoId; // ID do registro de cargo do funcionário a ser excluído

    try {
      const funcionarioCargo = await employeeRolesModel.findByPk(funcionarioCargoId);
      if (!funcionarioCargo) {
        return res.status(404).json({ error: 'Registro de cargo do funcionário não encontrado' });
      }

      await funcionarioCargo.destroy();

      res.json({ message: 'Registro de cargo do funcionário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir registro de cargo do funcionário' });
    }
  },

  async getFuncionarioCargoByFuncionarioIdOrCargoId(req, res) {
    const { funcionario_id, cargo_id } = req.query;

    try {
      // Use a função findAll do Sequelize para buscar registros de cargos de funcionários com base no funcionario_id OU cargo_id
      const funcionarioCargos = await employeeRolesModel.findAll({
        where: {
          [Op.or]: [
            { funcionario_id },
            { cargo_id }
          ]
        }
      });

      res.json(funcionarioCargos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros de cargo do funcionário por funcionario_id ou cargo_id' });
    }
  },

  // Adicione outras operações relacionadas ao cargo do funcionário aqui, se necessário
};
