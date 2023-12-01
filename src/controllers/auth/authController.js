const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/index');
const Logout = require('../../models/auth/Auth');
const db = require('../../utils/sequelize');

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id_usuario, scope: 'user' }, process.env.JWT_KEY || "whoami", {
            expiresIn: '24h' // Tempo de expiração de 24 horas
            //expiresIn: '180s' // Tempo de expiração de 3 minutos
        });

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
            return res.status(403).json({ error: 'Acesso não autorizado' });
        }

        // Inserir um registro na tabela de logs_logout
        await Logout.create({
            user_id: userId,
            data_hora: logoutTime
        });

        res.json({ message: 'Logout bem-sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer logout' });
    }
};

// Created by António Baptista #(24/08/2023)