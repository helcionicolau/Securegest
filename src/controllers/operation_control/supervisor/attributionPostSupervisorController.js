const { postoSupervisorModel } = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
    async registerPostoSupervisor(req, res) {
        try {
            const posto_supervisorData = {};

            // Lista de campos permitidos
            const allowedFields = [
                'id_usuario', 'id_posto'
            ];

            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    posto_supervisorData[field] = req.body[field];
                }
            });

            // Adicione a data de registro
            posto_supervisorData.data_registro = new Date();

            const newPostoSupervisor = await postoSupervisorModel.create(posto_supervisorData);

            res.status(201).json({ message: 'Posto atribuído ao Supervisor com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atribuir posto ao supervisor' });
        }
    },

    async getAllPostosSupervisores(req, res) {
        try {
            const posto_supervisores = await postoSupervisorModel.findAll();
            res.json(posto_supervisores);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar atribuições dos postos aos supervisores' });
        }
    },

    async getPostoSupervisorById(req, res) {
        const postoSupervisorId = req.params.postoSupervisorId;

        try {
            const posto_supervisor = await postoSupervisorModel.findByPk(postoSupervisorId);
            if (!posto_supervisor) {
                return res.status(404).json({ error: 'Posto atribuido ao supervisor não encontrado' });
            }
            res.json(posto_supervisor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar posto atribuido ao supervisor por ID' });
        }
    },

    async updatePostoSupervisor(req, res) {
        const postoSupervisorId = req.params.postoSupervisorId;

        try {
            const posto_supervisor = await postoSupervisorModel.findByPk(postoSupervisorId);
            if (!posto_supervisor) {
                return res.status(404).json({ error: 'Posto atribuído ao supervisor não encontrado' });
            }

            const posto_supervisorData = {};

            // Lista de campos permitidos para atualização
            const allowedFields = [
                'id_usuario', 'id_posto'
            ];

            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    posto_supervisorData[field] = req.body[field];
                }
            });

            // Adicione a data de atualização
            posto_supervisorData.data_atualizacao = new Date();

            // Atualiza apenas os campos fornecidos na requisição
            Object.assign(posto_supervisor, posto_supervisorData);

            // Salva as alterações no banco de dados
            await funcionario.save();

            res.json({ message: 'Posto atualizado ao supervisor com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o posto ao supervisor' });
        }
    },

    async deletePostoSupervisor(req, res) {
        const postoSupervisorId = req.params.postoSupervisorId;

        try {
            const posto_supervisor = await postoSupervisorModel.findByPk(postoSupervisorId);
            if (!posto_supervisor) {
                return res.status(404).json({ error: 'Posto atribuído ao supervisor não encontrado' });
            }

            await posto_supervisor.destroy();

            res.json({ message: 'Posto atribuído ao supervisor excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir posto atribuído ao supervisor' });
        }
    },

};

// Created by António Baptista #(24/08/2023)
