const { postModel } = require('../../../models/index');

module.exports = {
  async registerPosto(req, res) {
    const { descricao, id_posicao, id_operador, latitude, longitude } = req.body;

    try {
      const newPosto = await postModel.create({
        descricao,
        id_posicao,
        id_operador,
        latitude,
        longitude
      });

      res.status(201).json({ message: 'Posto registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar posto' });
    }
  },

  async getAllPostos(req, res) {
    try {
      const postos = await postModel.findAll();
      res.json(postos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar postos' });
    }
  },

  async getPostoById(req, res) {
    const postoId = req.params.postoId;

    try {
      const posto = await postModel.findByPk(postoId);
      if (!posto) {
        return res.status(404).json({ error: 'Posto não encontrado' });
      }
      res.json(posto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posto por ID' });
    }
  },
  
  async getPostosByPosicaoId(req, res) {
    const posicaoId = req.params.posicaoId;

    try {
      const postos = await postModel.findAll({
        where: {
          id_posicao: posicaoId
        }
      });
      if (!postos || postos.length === 0) {
        return res.status(404).json({ error: 'Postos não encontrados para a posição fornecida' });
      }
      res.json(postos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar postos por ID de posição' });
    }
  },

  async updatePosto(req, res) {
    const postoId = req.params.postoId;
    const { descricao, id_posicao, id_operador, latitude, longitude } = req.body;

    try {
      const posto = await postModel.findByPk(postoId);
      if (!posto) {
        return res.status(404).json({ error: 'Posto não encontrado' });
      }

      Object.assign(posto, {
        descricao,
        id_posicao,
        id_operador,
        latitude,
        longitude
      });

      await posto.save();

      res.json({ message: 'Posto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar posto' });
    }
  },

  async deletePosto(req, res) {
    const postoId = req.params.postoId;

    try {
      const posto = await postModel.findByPk(postoId);
      if (!posto) {
        return res.status(404).json({ error: 'Posto não encontrado' });
      }

      await posto.destroy();

      res.json({ message: 'Posto excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir posto' });
    }
  },
};
