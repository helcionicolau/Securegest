const FuncionarioDepartamento = require('../../../models/rh/employees_departments/ED');
const Funcionario = require('../../../models/rh/employees/Employee');
const Departamento = require('../../../models/rh/departments/Department');

FuncionarioDepartamento.belongsTo(Funcionario, { foreignKey: 'funcionario_id', as: 'funcionario' });
FuncionarioDepartamento.belongsTo(Departamento, { foreignKey: 'departamento_id', as: 'departamento' });

exports.registerFuncionarioDepartamento = async (req, res) => {
    const { funcionario_id, departamento_id } = req.body;

    try {
        // Obtenha a data atual
        const data_associacao = new Date();

        const newFuncionarioDepartamento = await FuncionarioDepartamento.create({
            funcionario_id,
            departamento_id,
            data_associacao
        });

        res.status(201).json({ message: 'Associação funcionário-departamento registrada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar associação funcionário-departamento' });
    }
};

exports.getAllFuncionariosDepartamentos = async (req, res) => {
    try {
        const funcionariosDepartamentos = await FuncionarioDepartamento.findAll({
            include: [
                {
                    model: Funcionario,
                    as: 'funcionario',
                    attributes: ['nome', 'cargo', /* outras colunas do funcionário */]
                },
                {
                    model: Departamento,
                    as: 'departamento',
                    attributes: ['nome', 'descricao', /* outras colunas do departamento */]
                }
            ]
        });

        res.json(funcionariosDepartamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar associações funcionário-departamento' });
    }
};


exports.getAssociationsByFuncionarioId = async (req, res) => {
    const funcionarioId = req.params.funcionarioId;

    try {
        const funcionariosDepartamentos = await FuncionarioDepartamento.findAll({
            where: {
                funcionario_id: funcionarioId
            },
            include: [
                {
                    model: Funcionario,
                    as: 'funcionario',
                    attributes: ['nome', 'cargo']
                },
                {
                    model: Departamento,
                    as: 'departamento',
                    attributes: ['nome', 'descricao']
                }
            ]
        });

        res.json(funcionariosDepartamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar associações por ID de funcionário' });
    }
};

exports.getAssociationsByDepartamentoId = async (req, res) => {
    const departamentoId = req.params.departamentoId;

    try {
        const funcionariosDepartamentos = await FuncionarioDepartamento.findAll({
            where: {
                departamento_id: departamentoId
            },
            include: [
                {
                    model: Funcionario,
                    as: 'funcionario',
                    attributes: ['nome', 'cargo']
                },
                {
                    model: Departamento,
                    as: 'departamento',
                    attributes: ['nome', 'descricao']
                }
            ]
        });

        res.json(funcionariosDepartamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar associações por ID de departamento' });
    }
};

exports.getFuncionarioDepartamentoById = async (req, res) => {
    const funcionarioDepartamentoId = req.params.funcionarioDepartamentoId; // ID da associação a ser buscada

    try {
        const funcionarioDepartamento = await FuncionarioDepartamento.findByPk(funcionarioDepartamentoId);
        if (!funcionarioDepartamento) {
            return res.status(404).json({ error: 'Associação funcionário-departamento não encontrada' });
        }
        res.json(funcionarioDepartamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar associação funcionário-departamento por ID' });
    }
};

exports.updateFuncionarioDepartamento = async (req, res) => {
    const funcionarioDepartamentoId = req.params.funcionarioDepartamentoId; // ID da associação a ser atualizada
    const { funcionario_id, departamento_id, data_associacao } = req.body;

    try {
        const funcionarioDepartamento = await FuncionarioDepartamento.findByPk(funcionarioDepartamentoId);
        if (!funcionarioDepartamento) {
            return res.status(404).json({ error: 'Associação funcionário-departamento não encontrada' });
        }

        // Atualiza apenas os campos fornecidos na requisição
        Object.assign(funcionarioDepartamento, {
            funcionario_id,
            departamento_id,
            data_associacao
        });

        await funcionarioDepartamento.save();

        res.json({ message: 'Associação funcionário-departamento atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar associação funcionário-departamento' });
    }
};

exports.deleteFuncionarioDepartamento = async (req, res) => {
    const funcionarioDepartamentoId = req.params.funcionarioDepartamentoId; // ID da associação a ser excluída

    try {
        const funcionarioDepartamento = await FuncionarioDepartamento.findByPk(funcionarioDepartamentoId);
        if (!funcionarioDepartamento) {
            return res.status(404).json({ error: 'Associação funcionário-departamento não encontrada' });
        }

        await funcionarioDepartamento.destroy();

        res.json({ message: 'Associação funcionário-departamento excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir associação funcionário-departamento' });
    }
};

// Adicione outras operações relacionadas à associação funcionário-departamento aqui, se necessário
// Created by António Baptista #(24/08/2023)
