const { positionModel } = require('../../../models/index');

module.exports = {
  async registerPosicao(req, res) {
    const {
      nome,
      descricao,
      id_zona,
      id_cliente,
      n_postos,
      provincia,
      municipio,
      latitude,
      longitude
    } = req.body;

    try {
      const newPosicao = await positionModel.create({
        nome,
        descricao,
        id_zona,
        id_cliente,
        n_postos,
        provincia,
        municipio,
        latitude,
        longitude
      });

      res.status(201).json({ message: 'Posição registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar posição' });
    }
  },

  async getAllPosicoes(req, res) {
    try {
      const posicoes = await positionModel.findAll();
      res.json(posicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posições' });
    }
  },

  async getPosicaoById(req, res) {
    const posicaoId = req.params.posicaoId;

    try {
      const posicao = await positionModel.findByPk(posicaoId);
      if (!posicao) {
        return res.status(404).json({ error: 'Posição não encontrada' });
      }
      res.json(posicao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posição por ID' });
    }
  },

  async getPosicoesByClientId(req, res) {
    const clientId = req.params.clientId;

    try {
      const posicoes = await Posicao.findAll({
        where: {
          id_cliente: clientId
        }
      });
      if (!posicoes || posicoes.length === 0) {
        return res.status(404).json({ error: 'Posições não encontradas para o cliente fornecido' });
      }
      res.json(posicoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar posições por ID de cliente' });
    }
  },

  async updatePosicao(req, res) {
    const posicaoId = req.params.posicaoId;
    const {
      nome,
      descricao,
      id_zona,
      id_cliente,
      n_postos,
      provincia,
      municipio,
      latitude,
      longitude
    } = req.body;

    try {
      const posicao = await positionModel.findByPk(posicaoId);
      if (!posicao) {
        return res.status(404).json({ error: 'Posição não encontrada' });
      }

      Object.assign(posicao, {
        nome,
        descricao,
        id_zona,
        id_cliente,
        n_postos,
        provincia,
        municipio,
        latitude,
        longitude
      });

      await posicao.save();

      res.json({ message: 'Posição atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar posição' });
    }
  },

  async deletePosicao(req, res) {
    const posicaoId = req.params.posicaoId;

    try {
      const posicao = await positionModel.findByPk(posicaoId);
      if (!posicao) {
        return res.status(404).json({ error: 'Posição não encontrada' });
      }

      await posicao.destroy();

      res.json({ message: 'Posição excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir posição' });
    }
  },
};
