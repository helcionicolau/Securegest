const { userProfileModel } = require('../../models/index');
const { Op } = require('sequelize');

module.exports = {
    async registerPerfil(req, res) {
        try {
            const perfilData = {};

            // Lista de campos permitidos
            const allowedFields = [
                'nome', 'descricao', 'id_departamento'
            ];

            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    perfilData[field] = req.body[field];
                }
            });

            const newPerfil = await userProfileModel.create(perfilData);
            res.status(201).json({ message: 'Perfil registrado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao registrar perfil.' });
        }
    },

    async getAllPerfis(req, res) {
        try {
            const perfis = await userProfileModel.findAll();
            res.json(perfis);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar perfis' });
        }
    },

    async getPerfilById(req, res) {
        const perfilId = req.params.perfilId;

        try {
            const perfil = await userProfileModel.findByPk(perfilId);
            if (!perfil) {
                return res.status(404).json({ error: 'Perfil não encontrado' });
            }
            res.json(perfil);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar perfil por ID' });
        }
    },

    async updatePerfil(req, res) {
        const perfilId = req.params.perfilId;

        try {
            const perfil = await userProfileModel.findByPk(perfilId);
            if (!perfil) {
                return res.status(404).json({ error: 'Perfil não encontrado' });
            }

            const perfilData = {};

            // Lista de campos permitidos para atualização
            const allowedFields = [
                'nome', 'descricao', 'id_departamento'
            ];

            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    perfilData[field] = req.body[field];
                }
            });

            // Atualiza apenas os campos fornecidos na requisição
            Object.assign(perfil, perfilData);

            // Salva as alterações no banco de dados
            await perfil.save();

            res.json({ message: 'Perfil atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar perfil' });
        }
    },

    async deletePerfil(req, res) {
        const perfilId = req.params.perfilId;

        try {
            const perfil = await userProfileModel.findByPk(perfilId);
            if (!perfil) {
                return res.status(404).json({ error: 'Perfil não encontrado' });
            }

            await perfil.destroy();

            res.json({ message: 'Perfil excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir perfil' });
        }
    },

};

// Created by António Baptista #(24/08/2023)