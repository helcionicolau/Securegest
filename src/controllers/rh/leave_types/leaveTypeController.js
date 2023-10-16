const TipoSaida = require('../../../models/rh/leave_types/leaveType');
const { Op } = require('sequelize');

exports.registerTipoSaida = async (req, res) => {
  const { nome, dia_saida, status } = req.body;

  try {
    const newTipoSaida = await TipoSaida.create({
      nome,
      dia_saida,
      status,
    });

    res.status(201).json({ message: 'Tipo de saída registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar tipo de saída' });
  }
};

exports.getAllTipoSaidas = async (req, res) => {
  try {
    const tipoSaidas = await TipoSaida.findAll();
    res.json(tipoSaidas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tipos de saída' });
  }
};

exports.getTotalTipoSaidas = async (req, res) => {
  try {
    const totalTipoSaidas = await TipoSaida.count();
    
    res.json(totalTipoSaidas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número total de tipo de saídas' });
  }
};

exports.getTipoSaidaById = async (req, res) => {
  const tipoSaidaId = req.params.tipoSaidaId;

  try {
    const tipoSaida = await TipoSaida.findByPk(tipoSaidaId);
    if (!tipoSaida) {
      return res.status(404).json({ error: 'Tipo de saída não encontrado' });
    }
    res.json(tipoSaida);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tipo de saída por ID' });
  }
};

exports.updateTipoSaida = async (req, res) => {
  const tipoSaidaId = req.params.tipoSaidaId;
  const { nome, dia_saida, status } = req.body;

  try {
    const tipoSaida = await TipoSaida.findByPk(tipoSaidaId);
    if (!tipoSaida) {
      return res.status(404).json({ error: 'Tipo de saída não encontrado' });
    }

    // Atualiza apenas os campos fornecidos na requisição
    Object.assign(tipoSaida, {
      nome,
      dia_saida,
      status,
    });

    await tipoSaida.save();

    res.json({ message: 'Tipo de saída atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar tipo de saída' });
  }
};

exports.deleteTipoSaida = async (req, res) => {
  const tipoSaidaId = req.params.tipoSaidaId;

  try {
    const tipoSaida = await TipoSaida.findByPk(tipoSaidaId);
    if (!tipoSaida) {
      return res.status(404).json({ error: 'Tipo de saída não encontrado' });
    }

    await tipoSaida.destroy();

    res.json({ message: 'Tipo de saída excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir tipo de saída' });
  }
};
