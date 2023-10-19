const {employee_departamentsModel} = require('../../../models/index');
const {employeesModel} = require('../../../models/index');
const {departamentsModel} = require('../../../models/index');

employee_departamentsModel.belongsTo(employeesModel, { foreignKey: 'funcionario_id', as: 'funcionario' });
employee_departamentsModel.belongsTo(departamentsModel, { foreignKey: 'departamento_id', as: 'departamento' });

module.exports = {
  async registerFuncionarioDepartamento(req, res) {
    const { funcionario_id, departamento_id } = req.body;

    try {
      // Obtenha a data atual
      const data_associacao = new Date();

      const newFuncionarioDepartamento = await employee_departamentsModel.create({
        funcionario_id,
        departamento_id,
        data_associacao
      });

      res.status(201).json({ message: 'Associação funcionário-departamento registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar associação funcionário-departamento' });
    }
  },

  async getAllFuncionariosDepartamentos(req, res) {
    try {
      const funcionariosDepartamentos = await employee_departamentsModel.findAll({
        include: [
          {
            model: employeesModel,
            as: 'funcionario',
            attributes: ['nome', 'cargo', /* outras colunas do funcionário */]
          },
          {
            model: departamentsModel,
            as: 'departamento',
            attributes: ['nome', 'descricao', /* outras colunas do departamento */]
          }
        ]
      });

      res.json(funcionariosDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações funcionário-departamento' });
    }
  },


  async getAssociationsByFuncionarioId(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const funcionariosDepartamentos = await employee_departamentsModel.findAll({
        where: {
          funcionario_id: funcionarioId
        },
        include: [
          {
            model: employeesModel,
            as: 'funcionario',
            attributes: ['nome', 'cargo']
          },
          {
            model: departamentsModel,
            as: 'departamento',
            attributes: ['nome', 'descricao']
          }
        ]
      });

      res.json(funcionariosDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações por ID de funcionário' });
    }
  },

  async getAssociationsByDepartamentoId(req, res) {
    const departamentoId = req.params.departamentoId;

    try {
      const funcionariosDepartamentos = await employee_departamentsModel.findAll({
        where: {
          departamento_id: departamentoId
        },
        include: [
          {
            model: employeesModel,
            as: 'funcionario',
            attributes: ['nome', 'cargo']
          },
          {
            model: departamentsModel,
            as: 'departamento',
            attributes: ['nome', 'descricao']
          }
        ]
      });

      res.json(funcionariosDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações por ID de departamento' });
    }
  },

  async getFuncionarioDepartamentoById(req, res) {
    const funcionarioDepartamentoId = req.params.funcionarioDepartamentoId; // ID da associação a ser buscada

    try {
      const funcionarioDepartamento = await employee_departamentsModel.findByPk(funcionarioDepartamentoId);
      if (!funcionarioDepartamento) {
        return res.status(404).json({ error: 'Associação funcionário-departamento não encontrada' });
      }
      res.json(funcionarioDepartamento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associação funcionário-departamento por ID' });
    }
  },

  async updateFuncionarioDepartamento(req, res) {
    const funcionarioDepartamentoId = req.params.funcionarioDepartamentoId; // ID da associação a ser atualizada
    const { funcionario_id, departamento_id, data_associacao } = req.body;

    try {
      const funcionarioDepartamento = await employee_departamentsModel.findByPk(funcionarioDepartamentoId);
      if (!funcionarioDepartamento) {
        return res.status(404).json({ error: 'Associação funcionário-departamento não encontrada' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.assign(funcionarioDepartamento, {
        funcionario_id,
        departamento_id,
        data_associacao
      });

      await funcionarioDepartamento.save();

      res.json({ message: 'Associação funcionário-departamento atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar associação funcionário-departamento' });
    }
  },

  async deleteFuncionarioDepartamento(req, res) {
    const funcionarioDepartamentoId = req.params.funcionarioDepartamentoId; // ID da associação a ser excluída

    try {
      const funcionarioDepartamento = await employee_departamentsModel.findByPk(funcionarioDepartamentoId);
      if (!funcionarioDepartamento) {
        return res.status(404).json({ error: 'Associação funcionário-departamento não encontrada' });
      }

      await funcionarioDepartamento.destroy();

      res.json({ message: 'Associação funcionário-departamento excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir associação funcionário-departamento' });
    }
  },

  // Adicione outras operações relacionadas à associação funcionário-departamento aqui, se necessário
};


// Created by António Baptista #(24/08/2023)
