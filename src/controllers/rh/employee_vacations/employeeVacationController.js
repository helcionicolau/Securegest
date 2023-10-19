const {employee_vacationsModel} = require('../../../models/index'); // Importe o modelo correto
const {employeesModel} = require('../../../models/index'); // Importe o modelo de funcionários
const { Op } = require('sequelize');

module.exports = {
  async registrarFerias(req, res) {
    const {
      id_funcionario,
      tipo_ferias,
      data_inicio,
      data_fim,
      observacoes,
      data_solicitacao, // Adicionado para registrar a data de solicitação
      data_aprovacao,  // Adicionado para registrar a data de aprovação
      data_conclusao,  // Adicionado para registrar a data de conclusão
      status,          // Adicionado para registrar o status
      contato_emergencia,
      saldo_atual,     // Adicionado para registrar o saldo atual
    } = req.body;

    try {
      // Verifique se o funcionário existe
      const funcionario = await employeesModel.findByPk(id_funcionario);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      // Verifique se o tipo de férias é válido (você pode adicionar mais validações aqui)
      const tiposValidos = ['Anual', 'Mensal', 'Semestral', 'Bimestral', 'Trimestral', 'Outro'];
      if (!tiposValidos.includes(tipo_ferias)) {
        return res.status(400).json({ error: 'Tipo de férias inválido' });
      }

      // Crie a solicitação de férias
      const novaSolicitacao = await employee_vacationsModel.create({
        id_funcionario,
        tipo_ferias,
        data_inicio,
        data_fim,
        observacoes,
        data_solicitacao, // Adicionado para registrar a data de solicitação
        data_aprovacao,  // Adicionado para registrar a data de aprovação
        data_conclusao,  // Adicionado para registrar a data de conclusão
        status,          // Adicionado para registrar o status
        contato_emergencia,
        saldo_atual,     // Adicionado para registrar o saldo atual
      });

      res.status(201).json({ message: 'Solicitação de férias registrada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar solicitação de férias' });
    }
  },

  async updateFuncionarioFerias(req, res) {
    const feriasId = req.params.feriasId; // ID da solicitação de férias a ser atualizada
    const {
      id_funcionario,
      tipo_ferias,
      data_inicio,
      data_fim,
      observacoes,
      data_solicitacao,
      data_aprovacao,
      data_conclusao,
      status,
      contato_emergencia,
      saldo_atual,
    } = req.body;

    try {
      const solicitacao = await employee_vacationsModel.findByPk(feriasId);
      if (!solicitacao) {
        return res.status(404).json({ error: 'Solicitação de férias não encontrada' });
      }

      // Atualize os campos fornecidos na solicitação de férias
      Object.assign(solicitacao, {
        id_funcionario,
        tipo_ferias,
        data_inicio,
        data_fim,
        observacoes,
        data_solicitacao,
        data_aprovacao,
        data_conclusao,
        status,
        contato_emergencia,
        saldo_atual,
      });

      await solicitacao.save();

      res.json({ message: 'Solicitação de férias atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar solicitação de férias' });
    }
  },

  async listarTodasFerias(req, res) {
    try {
      const ferias = await employee_vacationsModel.findAll();
      res.json(ferias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar solicitações de férias' });
    }
  },

  async aprovarRejeitarFerias(req, res) {
    const feriasId = req.params.feriasId; // ID da solicitação de férias a ser aprovada/rejeitada
    const { status } = req.body;

    try {
      const solicitacao = await employee_vacationsModel.findByPk(feriasId);
      if (!solicitacao) {
        return res.status(404).json({ error: 'Solicitação de férias não encontrada' });
      }

      // Verifique se o status é válido (você pode adicionar mais validações aqui)
      const statusValidos = ['Solicitado', 'Aprovado', 'Concluído', 'Cancelado', 'Outro'];
      if (!statusValidos.includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
      }

      // Atualize o status da solicitação de férias
      solicitacao.status = status;
      await solicitacao.save();

      res.json({ message: `Solicitação de férias ${status.toLowerCase()} com sucesso` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar status da solicitação de férias' });
    }
  },

  async consultarSaldoFerias(req, res) {
    const funcionarioId = req.params.funcionarioId; // ID do funcionário a ser consultado

    try {
      // Verifique se o funcionário existe
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      // Consulte todas as solicitações de férias aprovadas para o funcionário
      const feriasAprovadas = await employee_vacationsModel.findAll({
        where: {
          id_funcionario: funcionarioId,
          status: 'Aprovado',
        },
      });

      // Calcule o saldo atual de férias com base nas solicitações aprovadas
      let saldoAtualFerias = 0;
      feriasAprovadas.forEach((ferias) => {
        const dataInicio = new Date(ferias.data_inicio);
        const dataFim = new Date(ferias.data_fim);
        const diasFerias = (dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1;
        saldoAtualFerias += diasFerias;
      });

      res.json({ saldoAtualFerias });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consultar saldo de férias' });
    }
  },

  async getFuncionarioFeriasById(req, res) {
    const feriasId = req.params.feriasId; // ID da solicitação de férias a ser consultada

    try {
      const solicitacao = await employee_vacationsModel.findByPk(feriasId);
      if (!solicitacao) {
        return res.status(404).json({ error: 'Solicitação de férias não encontrada' });
      }

      res.json(solicitacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consultar solicitação de férias por ID' });
    }
  },

  async excluirFerias(req, res) {
    const feriasId = req.params.feriasId; // ID da solicitação de férias a ser excluída

    try {
      const solicitacao = await employee_vacationsModel.findByPk(feriasId);
      if (!solicitacao) {
        return res.status(404).json({ error: 'Solicitação de férias não encontrada' });
      }

      await solicitacao.destroy();

      res.json({ message: 'Solicitação de férias excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir solicitação de férias' });
    }
  },
};


// Created by António Baptista #(24/08/2023)