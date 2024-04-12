const { postModel, positionModel } = require('../../../models/index');

module.exports = {
  async createPosto(req, res) {
    const { descricao, id_posicao, latitude, longitude } = req.body;

    try {
      const novoPosto = await postModel.create({
        descricao,
        id_posicao,
        latitude,
        longitude,
      });

      res.status(201).json({ novoPosto });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar novo posto' });
    }
  },

  async getAllPostos(req, res) {
    try {
      const postos = await postModel.findAll({
        include: [{ model: positionModel, as: 'posicao' }],
      });

      res.json(postos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar postos' });
    }
  },

  async getPostoById(req, res) {
    const postoId = req.params.postoId;

    try {
      const posto = await postModel.findByPk(postoId, {
        include: [{ model: positionModel, as: 'posicao' }],
      });

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
        where: { id_posicao: posicaoId },
        include: [{ model: positionModel, as: 'posicao' }],
      });

      if (!postos.length) {
        return res.status(404).json({ error: 'Nenhum posto encontrado para a posição informada' });
      }

      res.json(postos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar postos por ID da posição' });
    }
  },

  async updatePosto(req, res) {
    const postoId = req.params.postoId;
    const updateFields = req.body;

    try {
      const posto = await postModel.findByPk(postoId);

      if (!posto) {
        return res.status(404).json({ error: 'Posto não encontrado' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(updateFields).forEach((field) => {
        if (updateFields[field] !== undefined) {
          posto[field] = updateFields[field];
        }
      });

      await posto.save();

      res.json({ message: 'Posto atualizado com sucesso!' });
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

      res.json({ message: 'Posto excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir posto' });
    }
  },
};
