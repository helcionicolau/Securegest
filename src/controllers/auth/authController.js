const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user/User');
const Logout = require('../../models/auth/Auth');

const JWT_KEY = process.env.JWT_KEY || "hoih989t7r8fb66rev65ec56eoc760/908y7te342312";
const TOKEN_EXPIRATION = '1h'; // Tempo de expiração de 1 horas
// const TOKEN_EXPIRATION = '180s'; // Tempo de expiração de 3 minutos

const ERROR_INVALID_CREDENTIALS = 'Credenciais inválidas';
const ERROR_USER_NOT_FOUND = 'Usuário não encontrado';
const ERROR_LOGOUT_UNAUTHORIZED = 'Acesso não autorizado';
const ERROR_LOGOUT_FAILED = 'Erro ao fazer logout';

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ error: ERROR_INVALID_CREDENTIALS });
        }

        const token = jwt.sign(
            { userId: user.id_usuario, scope: 'user' },
            JWT_KEY,
            { expiresIn: TOKEN_EXPIRATION }
        );        

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        if (!req.userData || !req.userData.userId) {
            return res.status(400).json({ error: 'ID do usuário não fornecido' });
        }

        const userId = req.userData.userId; // ID do usuário que fez logout
        const logoutTime = new Date(); // Hora atual

        if (req.userData.userId !== userId) {
            return res.status(403).json({ error: ERROR_LOGOUT_UNAUTHORIZED });
        }

        // Verifique se o usuário existe antes de criar o registro na tabela logs_logout
        const userExists = await User.findByPk(userId);

        if (!userExists) {
            return res.status(404).json({ error: ERROR_USER_NOT_FOUND });
        }

        // Inserir um registro na tabela de logs_logout
        await Logout.create({
            user_id: userId,
            data_hora: logoutTime
        });

        res.json({ message: 'Logout bem-sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: ERROR_LOGOUT_FAILED });
    }
};