const { dnLevantamentoModel, departamentsModel, clientsModel } = require( '../../../models' );

module.exports = {
  async registerLevantamento(req, res) {
    const {
      descricao,
      localizacao,
      id_departamento,
      id_cliente,
      latitude,
      longitude,
      status
    } = req.body;

    try {
      const newLevantamento = await dnLevantamentoModel.create({
        descricao,
        localizacao,
        id_departamento,
        id_cliente,
        latitude,
        longitude,
        status
      });

      res.status(201).json({ message: 'Levantamento criado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar levantamento' });
    }
  },

  async getAllLevantamentos(req, res) {
    try {
      const levantamentos = await dnLevantamentoModel.findAll({
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: clientsModel, as: 'cliente' }
        ]
      });

      res.json(levantamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar levantamentos' });
    }
  },

  async getLevantamentoById(req, res) {
    const levantamentoId = req.params.levantamentoId;

    try {
      const levantamento = await dnLevantamentoModel.findByPk(levantamentoId, {
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: clientsModel, as: 'cliente' }
        ]
      });
      if (!levantamento) {
        return res.status(404).json({ error: 'Levantamento não encontrado' });
      }
      res.json(levantamento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar levantamento por ID' });
    }
  },

  async updateLevantamento(req, res) {
    const levantamentoId = req.params.levantamentoId;

    try {
      const levantamento = await dnLevantamentoModel.findByPk(levantamentoId);
      if (!levantamento) {
        return res.status(404).json({ error: 'Levantamento não encontrado' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          levantamento[field] = req.body[field];
        }
      });

      await levantamento.save();

      res.json({ message: 'Levantamento atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar levantamento' });
    }
  },

  async deleteLevantamento(req, res) {
    const levantamentoId = req.params.levantamentoId;

    try {
      const levantamento = await dnLevantamentoModel.findByPk(levantamentoId);
      if (!levantamento) {
        return res.status(404).json({ error: 'Levantamento não encontrado' });
      }

      await levantamento.destroy();

      res.json({ message: 'Levantamento excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir levantamento' });
    }
  },

  async getLevantamentosByDepartamentoId(req, res) {
    const departamentoId = req.params.departamentoId;

    try {
      const levantamentos = await DnLevantamento.findAll({
        where: { id_departamento: departamentoId },
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: clientsModel, as: 'cliente' }
        ]
      });

      if (!levantamentos || levantamentos.length === 0) {
        return res.status(404).json({ error: 'Nenhum levantamento encontrado para este departamento' });
      }

      res.json(levantamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar levantamentos por ID do departamento' });
    }
  },

  async getLevantamentosByClienteId(req, res) {
    const clienteId = req.params.clienteId;

    try {
      const levantamentos = await DnLevantamento.findAll({
        where: { id_cliente: clienteId },
        include: [
          { model: departamentsModel, as: 'departamento' },
          { model: clientsModel, as: 'cliente' }
        ]
      });

      if (!levantamentos || levantamentos.length === 0) {
        return res.status(404).json({ error: 'Nenhum levantamento encontrado para este cliente' });
      }

      res.json(levantamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar levantamentos por ID do cliente' });
    }
  }

};
