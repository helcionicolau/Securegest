const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Funcionario = require('../../models/rh/employees/Employee');
const Logout = require('../../models/logout/Logout');

const JWT_KEY = process.env.JWT_KEY || "hoih989t7r8fb66rev65ec56eoc760/908y7te342312";
const TOKEN_EXPIRATION = '24h'; // Tempo de expiração de 24 horas

const ERROR_INVALID_CREDENTIALS = 'Credenciais inválidas';
const ERROR_FUNCIONARIO_NOT_FOUND = 'Funcionário não encontrado';
const ERROR_LOGOUT_UNAUTHORIZED = 'Acesso não autorizado';
const ERROR_LOGOUT_FAILED = 'Erro ao fazer logout';

exports.loginFuncionario = async (req, res) => {
    const { n_mec, senha } = req.body;

    try {
        const funcionario = await Funcionario.findOne({ where: { n_mec } });

        if (!funcionario || !(await bcrypt.compare(senha, funcionario.senha))) {
            return res.status(401).json({ error: ERROR_INVALID_CREDENTIALS });
        }

        const token = jwt.sign(
            { 
                funcionarioId: funcionario.id_funcionario, 
                n_mec: funcionario.n_mec,
                scope: 'funcionario' 
            },
            JWT_KEY,
            { expiresIn: TOKEN_EXPIRATION }
        );

        // Atualizar o status do funcionário para ONLINE
        await funcionario.update({ status: 'ONLINE' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.logoutFuncionario = async (req, res) => {
    try {
        // Verificar se o ID do funcionário está presente
        if (!req.user || !req.user.funcionarioId) { // Correção para 'funcionarioId'
            return res.status(400).json({ error: 'ID do funcionário não fornecido' });
        }

        const funcionarioId = req.user.funcionarioId;
        const logoutTime = new Date();

        // Verificar se o funcionário existe
        const funcionarioExists = await Funcionario.findByPk(funcionarioId);

        if (!funcionarioExists) {
            return res.status(404).json({ error: ERROR_FUNCIONARIO_NOT_FOUND });
        }

        // Atualizar o status para OFFLINE no logout
        await funcionarioExists.update({ status: 'OFFLINE' });

        // Inserir um registro na tabela de logout
        await Logout.create({
            funcionario_id: funcionarioId,
            data_hora: logoutTime
        });

        res.json({ message: 'Logout bem-sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: ERROR_LOGOUT_FAILED });
    }
};
