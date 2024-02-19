const { projectsModel } = require('../../../models/index');

module.exports = {
  async registerProjeto(req, res) {
    const { nome, descricao, sumario, data_inicio, data_fim_prevista, estado, tipo_projeto, progresso, id_posicao } = req.body;

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
        id_posicao
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

  async getProjetosByPosicaoId(req, res) {
    const posicaoId = req.params.posicaoId;

    try {
      const projetos = await projectsModel.findAll({
        where: {
          id_posicao: posicaoId
        }
      });
      if (!projetos || projetos.length === 0) {
        return res.status(404).json({ error: 'Projetos não encontrados para a posição fornecida' });
      }
      res.json(projetos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar projetos por ID de posição' });
    }
  },

  async updateProjeto(req, res) {
    const projetoId = req.params.projetoId;
    const { nome, descricao, sumario, data_inicio, data_fim_prevista, estado, tipo_projeto, progresso, id_posicao } = req.body;

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
        id_posicao
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