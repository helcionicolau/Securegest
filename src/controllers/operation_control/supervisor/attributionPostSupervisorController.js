const { postoSupervisorModel } = require('../../../models/index');
const { userModel, userProfileModel } = require('../../../models/index');

module.exports = {
    async registerPostoSupervisor(req, res) {
        const { id_usuario, id_posto } = req.body;

        try {
            const newSupervisorPosto = await postoSupervisorModel.create({
                id_usuario,
                id_posto,
                data_registro: new Date(), // Adicionando a data de registro
            });

            res.status(201).json({ message: 'Posto atribuído com sucesso ao supervisor' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atribuir o posto ao supervisor' });
        }
    },

    async getAllPostosSupervisores(req, res) {
        try {
            const postosSupervisor = await postoSupervisorModel.findAll();
            res.json(postosSupervisor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar postos atribuídos aos supervisores' });
        }
    },

    async getAllSupervisorUsers(req, res) {
        try {
            const supervisorProfile = await userProfileModel.findOne({
                where: { nome: 'Supervisor' },
                attributes: ['id_perfil'],
            });

            if (!supervisorProfile) {
                return res.status(404).json({ error: 'Perfil de Supervisor não encontrado' });
            }

            const supervisorUsers = await userModel.findAll({
                where: {
                    id_perfil: supervisorProfile.id_perfil,
                },
            });

            res.json(supervisorUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar usuários com perfil de Supervisor' });
        }
    },


    async getPostoSupervisorById(req, res) {
        const postoSupervisorId = req.params.postoSupervisorId;

        try {
            const postosSupervisor = await postoSupervisorModel.findByPk(postoSupervisorId);
            if (!postosSupervisor) {
                return res.status(404).json({ error: 'Posto do supervisor não encontrado' });
            }
            res.json(postosSupervisor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar posto atribuído por ID' });
        }
    },

    async updatePostoSupervisor(req, res) {
        const postoSupervisorId = req.params.postoSupervisorId;
        const { id_usuario, id_posto } = req.body;

        try {
            const postosSupervisor = await postoSupervisorModel.findByPk(postoSupervisorId);
            if (!postosSupervisor) {
                return res.status(404).json({ error: 'Posto atribuído ao supervisor não encontrado' });
            }

            postosSupervisor.set({
                id_usuario,
                id_posto,
                data_atualizacao: new Date(), // Adicionando a data de atualização
            });

            await postosSupervisor.save();

            res.json({ message: 'Posto atribuído ao supervisor atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o posto ao supervisor' });
        }
    },

    async deletePostoSupervisor(req, res) {
        const postoSupervisorId = req.params.postoSupervisorId;

        try {
            const postosSupervisor = await postoSupervisorModel.findByPk(postoSupervisorId);
            if (!postosSupervisor) {
                return res.status(404).json({ error: 'Posto atribuído ao supervisor não encontrado' });
            }

            await postosSupervisor.destroy();

            res.json({ message: 'Posto atribuído ao supervisor excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o posto atribuído ao supervisor' });
        }
    }
};

// Adicione outras operações relacionadas ao departamento aqui, se necessário
// Created by António Baptista #(24/08/2023)