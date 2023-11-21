const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user/User');
const Employee = require('../../models/rh/employees/Employee');
const Logout = require('../../models/auth/Auth');
const db = require('../../utils/sequelize');

exports.login = async (req, res) => {
    const { email, senha, n_mec } = req.body;
    let user, id, scope;

    try {
        // Verifica se está vindo um email, se sim, é usuário; se não, é funcionário
        if (email) {
            user = await User.findOne({ where: { email } });
            id = user.id_usuario;
            scope = 'user';
        } else if (n_mec) {
            user = await Employee.findOne({ where: { n_mec } });
            id = user.id_funcionario;
            scope = 'employee';
        } else {
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: id, scope }, process.env.JWT_KEY || "whoami", {
            expiresIn: '24h'
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