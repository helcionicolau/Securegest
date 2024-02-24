const { postModel, employeesModel } = require('../../../models/index');

module.exports = {
  async registerPosto(req, res) {
    const { descricao, id_posicao, id_funcionario, latitude, longitude } = req.body;

    try {
      const newPosto = await postModel.create({
        descricao,
        id_posicao,
        id_funcionario,
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

  async getSegurancaNaoAdicionados(req, res) {
    try {
      // Passo 1: Buscar todos os funcionários com cargo 'Seguranca'
      const segurancaFuncionarios = await employeesModel.findAll({
        where: {
          cargo: 'Seguranca',
        },
      });

      // Passo 2: Buscar todos os funcionários que já foram adicionados a algum posto
      const funcionariosAdicionados = await postModel.findAll({
        attributes: ['id_funcionario'], // Apenas queremos o id_funcionario
        raw: true,
      });

      // Extrair apenas os IDs dos funcionários que já foram adicionados a algum posto
      const funcionariosAdicionadosIds = funcionariosAdicionados.map(item => item.id_funcionario);

      // Passo 3: Filtrar os funcionários de Seguranca que ainda não foram adicionados a nenhum posto
      const segurancaNaoAdicionados = segurancaFuncionarios.filter(funcionario => {
        return !funcionariosAdicionadosIds.includes(funcionario.id_funcionario);
      });

      res.json(segurancaNaoAdicionados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar seguranças não adicionados a nenhum posto' });
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
        id_funcionario,
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
