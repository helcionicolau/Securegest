const FuncionarioSaida = require('../../../models/rh/employee_leaves/employeeLeave');
const { Op } = require('sequelize');

exports.registerFuncionarioSaida = async (req, res) => {
    const {
        id_funcionario,
        id_tipo_saida,
        tipo_saida,
        data_inicio,
        data_fim,
        duracao_saida,
        motivo,
        status_saida
    } = req.body;

    try {
        const newFuncionarioSaida = await FuncionarioSaida.create({
            id_funcionario,
            id_tipo_saida,
            tipo_saida,
            data_inicio,
            data_fim,
            duracao_saida,
            data_registro: new Date(),
            motivo,
            status_saida
        });

        res.status(201).json({ message: 'Saída do funcionário registrada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar saída do funcionário' });
    }
};

exports.getAllFuncionarioSaidas = async (req, res) => {
    try {
        const funcionarioSaidas = await FuncionarioSaida.findAll();
        res.json(funcionarioSaidas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar saídas do funcionário' });
    }
};

exports.getTotalFuncionarioSaidas = async (req, res) => {
    try {
        const totalFuncionarioSaidas = await FuncionarioSaida.count();

        res.json(totalFuncionarioSaidas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o número total de saídas de funcionários' });
    }
};

exports.getFuncionarioSaidaById = async (req, res) => {
    const funcionarioSaidaId = req.params.funcionarioSaidaId;

    try {
        const funcionarioSaida = await FuncionarioSaida.findByPk(funcionarioSaidaId);
        if (!funcionarioSaida) {
            return res.status(404).json({ error: 'Saída do funcionário não encontrada' });
        }
        res.json(funcionarioSaida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar saída do funcionário por ID' });
    }
};

exports.updateFuncionarioSaida = async (req, res) => {
    const funcionarioSaidaId = req.params.funcionarioSaidaId;
    const {
        id_funcionario,
        id_tipo_saida,
        tipo_saida,
        data_inicio,
        data_fim,
        duracao_saida,
        motivo,
        status_saida
    } = req.body;

    try {
        const funcionarioSaida = await FuncionarioSaida.findByPk(funcionarioSaidaId);
        if (!funcionarioSaida) {
            return res.status(404).json({ error: 'Saída do funcionário não encontrada' });
        }

        // Atualiza apenas os campos fornecidos na requisição
        Object.assign(funcionarioSaida, {
            id_funcionario,
            id_tipo_saida,
            tipo_saida,
            data_inicio,
            data_fim,
            duracao_saida,
            motivo,
            status_saida
        });

        await funcionarioSaida.save();

        res.json({ message: 'Saída do funcionário atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar saída do funcionário' });
    }
};

exports.deleteFuncionarioSaida = async (req, res) => {
    const funcionarioSaidaId = req.params.funcionarioSaidaId;

    try {
        const funcionarioSaida = await FuncionarioSaida.findByPk(funcionarioSaidaId);
        if (!funcionarioSaida) {
            return res.status(404).json({ error: 'Saída do funcionário não encontrada' });
        }

        await funcionarioSaida.destroy();

        res.json({ message: 'Saída do funcionário excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir saída do funcionário' });
    }
};

// Created by António Baptista #(24/08/2023)