const {projectsModel} = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
  async registerProjeto(req, res) {
    const {
      nome,
      descricao,
      sumario,
      data_inicio,
      data_fim_prevista,
      estado,
      tipo_projeto,
      progresso,
      id_cliente,
      id_departamento
    } = req.body;

    try {
      const newProjeto = await projectsModel.create({
        nome,
        descricao,
        sumario,
        data_inicio,
        data_fim_prevista,
        estado,
        tipo_projeto,
        progresso,
        id_cliente,
        id_departamento
      });

      res.status(201).json({ message: 'Projeto registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar projeto' });
    }
  },

  async getAllProjetos(req, res) {
    try {
      const projetos = await projectsModel.findAll();
      res.json(projetos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
  },

  async getTotalProjetos(req, res) {
    try {
      const totalProjetos = await projectsModel.count();
      res.json(totalProjetos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de projetos' });
    }
  },

  async getTotalProjetosPorData(req, res) {
    const { dataInicio, dataFim } = req.query;

    try {
      const totalProjetos = await projectsModel.count({
        where: {
          data_registro: {
            [Op.between]: [dataInicio, dataFim],
          },
        },
      });

      res.json(totalProjetos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o número total de projetos por data' });
    }
  },

  async getProjetoById(req, res) {
    const projetoId = req.params.projetoId;

    try {
      const projeto = await projectsModel.findByPk(projetoId);
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }
      res.json(projeto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar projeto por ID' });
    }
  },

  async getProjetosByDepartamento(req, res) {
    const id_departamento = req.params.id_departamento; // ID do departamento a ser filtrado

    try {
      const projetos = await projectsModel.findAll({
        where: {
          id_departamento: id_departamento,
        },
      });

      res.json(projetos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar projetos por departamento' });
    }
  },

  async updateProjeto(req, res) {
    const projetoId = req.params.projetoId;
    const {
      nome,
      descricao,
      sumario,
      data_inicio,
      data_fim_prevista,
      estado,
      tipo_projeto,
      progresso,
      id_cliente,
      id_departamento
    } = req.body;

    try {
      const projeto = await projectsModel.findByPk(projetoId);
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }

      Object.assign(projeto, {
        nome,
        descricao,
        sumario,
        data_inicio,
        data_fim_prevista,
        estado,
        tipo_projeto,
        progresso,
        id_cliente,
        id_departamento
      });

      await projeto.save();

      res.json({ message: 'Projeto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
  },

  async deleteProjeto(req, res) {
    const projetoId = req.params.projetoId;

    try {
      const projeto = await projectsModel.findByPk(projetoId);
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }

      await projeto.destroy();

      res.json({ message: 'Projeto excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir projeto' });
    }
  },
};

// Created by António Baptista #(24/08/2023)