const FuncionarioTarefa = require('../../../models/general_diretion/employee_tasks/employeeTask');
const Projeto = require('../../../models/general_diretion/projects/Project');
const Funcionario = require('../../../models/rh/employees/Employee');
const { Op } = require('sequelize');

// Registra uma nova atribuição de tarefa a um funcionário
exports.registrarFuncionarioTarefa = async (req, res) => {
    const { id_funcionario, id_tarefa, tarefa, data_associacao } = req.body;

    try {
        const novaFuncionarioTarefa = await FuncionarioTarefa.create({
            id_funcionario,
            id_tarefa,
            tarefa,
            data_associacao,
        });

        res.status(201).json({ message: 'Atribuição de tarefa ao funcionário registrada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar atribuição de tarefa ao funcionário' });
    }
};

// Obtém todas as atribuições de tarefas a funcionários
exports.obterTodasFuncionarioTarefas = async (req, res) => {
    try {
        const funcionarioTarefas = await FuncionarioTarefa.findAll();
        res.json(funcionarioTarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar atribuições de tarefas a funcionários' });
    }
};

// Obtém o total de atribuições de tarefas a funcionários
exports.obterTotalFuncionarioTarefas = async (req, res) => {
    try {
        const totalFuncionarioTarefas = await FuncionarioTarefa.count();
        res.json(totalFuncionarioTarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o número total de atribuições de tarefas a funcionários' });
    }
};

// Obtém uma atribuição de tarefa a funcionário pelo ID
exports.obterFuncionarioTarefaPorId = async (req, res) => {
    const funcionarioTarefaId = req.params.funcionarioTarefaId;

    try {
        const funcionarioTarefa = await FuncionarioTarefa.findByPk(funcionarioTarefaId);
        if (!funcionarioTarefa) {
            return res.status(404).json({ error: 'Atribuição de tarefa ao funcionário não encontrada' });
        }
        res.json(funcionarioTarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar atribuição de tarefa ao funcionário por ID' });
    }
};

// Obtém todas as atribuições de tarefas a um funcionário pelo ID do funcionário
exports.obterTarefasDoFuncionarioPorId = async (req, res) => {
    const funcionarioId = req.params.funcionarioId;

    try {
        const tarefasDoFuncionario = await FuncionarioTarefa.findAll({
            where: { id_funcionario: funcionarioId },
        });

        res.json(tarefasDoFuncionario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar atribuições de tarefas do funcionário por ID' });
    }
};

// Obtém todas as atribuições de tarefas pelo ID da tabela tarefa
exports.obterTodasFuncionarioTarefasPorIdDaTarefa = async (req, res) => {
    const tarefaId = req.params.tarefaId;

    try {
        const tarefasDoTarefa = await FuncionarioTarefa.findAll({
            where: { id_tarefa: tarefaId },
        });

        res.json(tarefasDoTarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar atribuições de tarefas pelo ID da tarefa' });
    }
};

// Atualiza uma atribuição de tarefa a funcionário pelo ID
exports.atualizarFuncionarioTarefa = async (req, res) => {
    const funcionarioTarefaId = req.params.funcionarioTarefaId;
    const { id_funcionario, id_tarefa, tarefa, data_associacao } = req.body;

    try {
        const funcionarioTarefa = await FuncionarioTarefa.findByPk(funcionarioTarefaId);
        if (!funcionarioTarefa) {
            return res.status(404).json({ error: 'Atribuição de tarefa ao funcionário não encontrada' });
        }

        // Atualiza apenas os campos fornecidos na requisição
        Object.assign(funcionarioTarefa, { id_funcionario, id_tarefa, tarefa, data_associacao });

        await funcionarioTarefa.save();

        res.json({ message: 'Atribuição de tarefa ao funcionário atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar atribuição de tarefa ao funcionário' });
    }
};

// Exclui uma atribuição de tarefa a funcionário pelo ID
exports.excluirFuncionarioTarefa = async (req, res) => {
    const funcionarioTarefaId = req.params.funcionarioTarefaId;

    try {
        const funcionarioTarefa = await FuncionarioTarefa.findByPk(funcionarioTarefaId);
        if (!funcionarioTarefa) {
            return res.status(404).json({ error: 'Atribuição de tarefa ao funcionário não encontrada' });
        }

        await funcionarioTarefa.destroy();

        res.json({ message: 'Atribuição de tarefa ao funcionário excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir atribuição de tarefa ao funcionário' });
    }
};

// Created by António Baptista #(24/08/2023)