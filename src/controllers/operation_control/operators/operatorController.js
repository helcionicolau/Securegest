const { operatorModel, postModel } = require('../../../models/index');

module.exports = {
  async registerOperador(req, res) {
    const { id_posto, id_funcionario } = req.body;

    try {
      const newOperador = await operatorModel.create({
        id_posto,
        id_funcionario
      });

      res.status(201).json({ message: 'Operador registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar operador' });
    }
  },

  async getAllOperadores(req, res) {
    try {
      const operadores = await operatorModel.findAll();
      res.json(operadores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar operadores' });
    }
  },

  async getOperadorById(req, res) {
    const operadorId = req.params.operadorId;

    try {
      const operador = await operatorModel.findByPk(operadorId);
      if (!operador) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }
      res.json(operador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar operador por ID' });
    }
  },

  async getOperadoresByFuncionarioId(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const operadores = await operatorModel.findAll({
        where: {
          id_funcionario: funcionarioId
        }
      });
      if (!operadores || operadores.length === 0) {
        return res.status(404).json({ error: 'Operadores não encontrados para o funcionário fornecido' });
      }
      res.json(operadores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar operadores por ID de funcionário' });
    }
  },

  async getOperadoresNaoAssociados(req, res) {
    try {
      // Encontre todos os operadores que não têm um registro correspondente na tabela de postos
      const operadoresNaoAssociados = await operatorModel.findAll({
        where: {
          // Subconsulta para verificar se o operador não está associado a nenhum posto
          id_operador: {
            [operatorModel.sequelize.Op.notIn]: operatorModel.sequelize.literal(
              `SELECT DISTINCT id_operador FROM operadores WHERE id_operador IS NOT NULL`
            )
          }
        }
      });

      res.json(operadoresNaoAssociados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar operadores não associados a postos' });
    }
  },

  async updateOperador(req, res) {
    const operadorId = req.params.operadorId;
    const { id_posto, id_funcionario } = req.body;

    try {
      const operador = await operatorModel.findByPk(operadorId);
      if (!operador) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }

      Object.assign(operador, {
        id_posto,
        id_funcionario
      });

      await operador.save();

      res.json({ message: 'Operador atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar operador' });
    }
  },

  async deleteOperador(req, res) {
    const operadorId = req.params.operadorId;

    try {
      const operador = await operatorModel.findByPk(operadorId);
      if (!operador) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }

      await operador.destroy();

      res.json({ message: 'Operador excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir operador' });
    }
  },
};
