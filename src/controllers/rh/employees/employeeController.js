const bcrypt = require('bcrypt');
const { employeesModel } = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
  async registerFuncionario(req, res) {
    try {
      // Inicialize um objeto vazio para armazenar os dados do funcionário
      const funcionarioData = {};

      // Lista de campos permitidos
      const allowedFields = [
        'n_mec', 'nome', 'sexo', 'estado_civil', 'data_nascimento', 'data_contratacao',
        'nif', 'cargo', 'departamento_id', 'carga_horaria_diaria'
      ];

      // Preencha o objeto de dados do funcionário apenas com os campos fornecidos
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          funcionarioData[field] = req.body[field];
        }
      });

      // Adicione a data de registro
      funcionarioData.data_registro = new Date();

      // Use a função create do Sequelize para criar um novo funcionário com os dados fornecidos
      const newFuncionario = await employeesModel.create(funcionarioData);

      res.status(201).json({ message: 'Funcionário registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar funcionário' });
    }
  },

  async getAllFuncionarios(req, res) {
    try {
      const funcionarios = await employeesModel.findAll();
      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
  },

  async getTotalFuncionarios(req, res) {
    try {
      // Obtém o número total de funcionários usando a função count do Sequelize
      const totalFuncionarios = await employeesModel.count();

      res.json(totalFuncionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de funcionários' });
    }
  },

  async getTotalFuncionariosPorData(req, res) {
    const { dataInicio, dataFim } = req.query;

    try {
      // Use a função count do Sequelize para obter o número total de funcionários com base nas datas fornecidas
      const totalFuncionarios = await employeesModel.count({
        where: {
          data_registro: {
            [Op.between]: [dataInicio, dataFim],
          },
        },
      });

      res.json(totalFuncionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de funcionários por data' });
    }
  },

  async getFuncionarioById(req, res) {
    const funcionarioId = req.params.funcionarioId; // ID do funcionário a ser buscado

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }
      res.json(funcionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionário por ID' });
    }
  },

  async getFuncionariosByDepartamento(req, res) {
    const departamentoId = req.params.departamentoId; // ID do departamento a ser filtrado
    try {
      // Use a função findAll do Sequelize para obter todos os funcionários com o departamento_id correspondente
      const funcionarios = await employeesModel.findAll({
        where: {
          departamento_id: departamentoId,
        },
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários por departamento' });
    }
  },

  async getFuncionariosByN_MEC(req, res) {
    const n_mecId = req.params.n_mecId;
    try {
      const funcionarios = await employeesModel.findAll({
        where: {
          n_mec: n_mecId,
        },
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários por n_mec' });
    }
  },

  async getFuncionariosSeguranca(req, res) {
    try {
      // Consulta SQL bruta para selecionar todos os funcionários com cargo 'Seguranca'
      const query = `
        SELECT * 
        FROM funcionarios 
        WHERE cargo = 'Seguranca';
      `;

      // Executar a consulta utilizando o método query do Sequelize
      const funcionariosSeguranca = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

      // Verificar se foram encontrados funcionários
      if (funcionariosSeguranca.length === 0) {
        return res.status(404).json({ error: 'Funcionários de segurança não encontrados' });
      }

      res.json(funcionariosSeguranca);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários de Segurança' });
    }
  },    
  
  async updateFuncionario(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      // Inicialize um objeto vazio para armazenar os dados do funcionário
      const funcionarioData = {};

      // Lista de campos permitidos para atualização
      const allowedFields = [
        'n_mec', 'nome', 'sexo', 'estado_civil', 'data_nascimento', 'data_contratacao',
        'nif', 'cargo', 'departamento_id', 'carga_horaria_diaria'
      ];

      // Preencha o objeto de dados do funcionário apenas com os campos fornecidos
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          funcionarioData[field] = req.body[field];
        }
      });

      // Adicione a data de atualização
      funcionarioData.data_atualizacao = new Date();

      // Atualiza apenas os campos fornecidos na requisição
      Object.assign(funcionario, funcionarioData);

      // Salva as alterações no banco de dados
      await funcionario.save();

      res.json({ message: 'Funcionário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar funcionário' });
    }
  },

  async deleteFuncionario(req, res) {
    const funcionarioId = req.params.funcionarioId; // ID do funcionário a ser excluído

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      await funcionario.destroy();

      res.json({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir funcionário' });
    }
  },

  // Adicione outras operações relacionadas ao funcionário aqui, como atualização de perfil e uploads de imagem
};

// Created by António Baptista #(24/08/2023)
