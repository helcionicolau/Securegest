const { providerModel } = require('../../../models/index');

module.exports = {
  async registerProvedora(req, res) {
    const { nome, descricao } = req.body;

    try {
      const newProvedora = await providerModel.create({
        nome,
        descricao,
      });

      res.status(201).json({ message: 'Provedora registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar provedora' });
    }
  },

  async getAllProvedoras(req, res) {
    try {
      const provedoras = await providerModel.findAll();
      res.json(provedoras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar provedoras' });
    }
  },

  async getProvedoraById(req, res) {
    const provedoraId = req.params.provedoraId;

    try {
      const provedora = await providerModel.findByPk(provedoraId);
      if (!provedora) {
        return res.status(404).json({ error: 'Provedora não encontrada' });
      }
      res.json(provedora);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar provedora por ID' });
    }
  },

  async updateProvedora(req, res) {
    const provedoraId = req.params.provedoraId;
    const { nome, descricao } = req.body;

    try {
      const provedora = await providerModel.findByPk(provedoraId);
      if (!provedora) {
        return res.status(404).json({ error: 'Provedora não encontrada' });
      }

      Object.assign(provedora, {
        nome,
        descricao,
      });

      await provedora.save();

      res.json({ message: 'Provedora atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar provedora' });
    }
  },

  async deleteProvedora(req, res) {
    const provedoraId = req.params.provedoraId;

    try {
      const provedora = await providerModel.findByPk(provedoraId);
      if (!provedora) {
        return res.status(404).json({ error: 'Provedora não encontrada' });
      }

      await provedora.destroy();

      res.json({ message: 'Provedora excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir provedora' });
    }
  },
};
