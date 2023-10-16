const Projeto = require('../../../models/general_diretion/projects/Project');
const { Op } = require('sequelize');

exports.registerProjeto = async (req, res) => {
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
    const newProjeto = await Projeto.create({
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
};

exports.getAllProjetos = async (req, res) => {
  try {
    const projetos = await Projeto.findAll();
    res.json(projetos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
};

exports.getTotalProjetos = async (req, res) => {
  try {
    const totalProjetos = await Projeto.count();

    res.json(totalProjetos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de projetos' });
  }
};

exports.getTotalProjetosPorData = async (req, res) => {
  const { dataInicio, dataFim } = req.query;

  try {
    const totalProjetos = await Projeto.count({
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
};

exports.getProjetoById = async (req, res) => {
  const projetoId = req.params.projetoId;

  try {
    const projeto = await Projeto.findByPk(projetoId);
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    res.json(projeto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar projeto por ID' });
  }
};

// Define um novo endpoint para obter projetos por id_departamento
exports.getProjetosByDepartamento = async (req, res) => {
  const id_departamento = req.params.id_departamento; // ID do departamento a ser filtrado

  try {
    // Use a função findAll do Sequelize para obter todos os projetos com o departamento_id correspondente
    const projetos = await Projeto.findAll({
      where: {
        id_departamento: id_departamento,
      },
    });

    res.json(projetos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar projetos por departamento' });
  }
};

exports.updateProjeto = async (req, res) => {
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
    const projeto = await Projeto.findByPk(projetoId);
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
};

exports.deleteProjeto = async (req, res) => {
  const projetoId = req.params.projetoId;

  try {
    const projeto = await Projeto.findByPk(projetoId);
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    await projeto.destroy();

    res.json({ message: 'Projeto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir projeto' });
  }
};

// Created by António Baptista #(24/08/2023)