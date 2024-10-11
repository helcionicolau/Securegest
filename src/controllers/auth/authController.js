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
                n_mec: funcionario.n_mec, // Adicionando n_mec ao payload do token
                scope: 'funcionario' 
            },
            JWT_KEY,
            { expiresIn: TOKEN_EXPIRATION }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.logoutFuncionario = async (req, res) => {
    try {
        // Verifique se o ID do funcionário está presente no token decodificado
        if (!req.userData || !req.userData.funcionarioId) {
            return res.status(400).json({ error: 'ID do funcionário não fornecido' });
        }

        const funcionarioId = req.userData.funcionarioId; // ID do funcionário que fez logout
        const logoutTime = new Date(); // Hora atual

        // Verifique se o funcionário existe antes de criar o registro na tabela logs_logout
        const funcionarioExists = await Funcionario.findByPk(funcionarioId);

        if (!funcionarioExists) {
            return res.status(404).json({ error: ERROR_FUNCIONARIO_NOT_FOUND });
        }

        // Inserir um registro na tabela de logs_logout
        await Logout.create({
            funcionario_id: funcionarioId, // Usando o campo correto 'funcionario_id'
            data_hora: logoutTime // Hora do logout
        });

        res.json({ message: 'Logout bem-sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: ERROR_LOGOUT_FAILED });
    }
};

