const { postoSupervisorModel } = require('../../../models/index');
const { userModel, userProfileModel } = require('../../../models/index');

module.exports = {
    async registerPostoSeguranca(req, res) {
        const data = req.body;
        const supervisorId = req.userData.userId;

        try {
            // Verifica se o usuário é um supervisor cadastrado
            const supervisor = await postoSupervisorModel.findOne({
                where: { id_usuario: supervisorId }
            });

            if (!supervisor) {
                return res.status(403).json({ error: 'Acesso não autorizado. Apenas supervisores podem registrar seguranças.' });
            }

            // Iterar sobre cada objeto no array
            for (const record of data) {
                const { id_posto, n_mec } = record;

                // Verifica se o supervisor está atribuído ao posto
                const supervisorPosto = await postoSupervisorModel.findOne({
                    where: { id_usuario: supervisorId, id_posto }
                });

                if (!supervisorPosto) {
                    return res.status(403).json({ error: 'Acesso não autorizado. O supervisor não está atribuído a este posto.' });
                }

                // Criar um novo registro para cada par id_posto e n_mec
                await postoSegurancaModel.create({
                    id_posto,
                    n_mec,
                    data_registro: new Date()
                });
            }

            res.status(201).json({ message: 'Seguranças atribuídos com sucesso aos postos' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atribuir os seguranças aos postos' });
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

// Created by António Baptista #(24/08/2023)