const { postoSegurancaModel, postoSupervisorModel, userModel, userProfileModel } = require('../../../models/index');

module.exports = {
    async registerPostoSeguranca(req, res) {
        const data = req.body;
        const userId = req.userData.userId;

        try {
            // Verificar se o usuário tem o perfil de Supervisor, SuperAdmin ou Admin
            const allowedProfiles = ['Supervisor', 'SuperAdmin', 'Admin'];
            const user = await userModel.findOne({
                where: { id_usuario: userId },
                include: [{ model: userProfileModel, attributes: ['nome'] }]
            });

            if (!user || !allowedProfiles.includes(user.user_profile.nome)) {
                return res.status(403).json({ error: 'Acesso não autorizado. Perfis permitidos: Supervisor, SuperAdmin, Admin' });
            }

            // Iterar sobre cada objeto no array
            for (const record of data) {
                const { id_posto, n_mec } = record;

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

    async getAllPostosSegurancas(req, res) {
        const userId = req.userData.userId; // Obtém o ID do usuário a partir do token

        try {
            // Verificar se o usuário tem o perfil de Supervisor, SuperAdmin ou Admin
            const allowedProfiles = ['Supervisor', 'SuperAdmin', 'Admin'];
            const user = await userModel.findByPk(userId, {
                include: [{ model: userProfileModel, as: 'perfil' }]
            });

            if (!user || !user.perfil || !allowedProfiles.includes(user.perfil.nome)) {
                return res.status(403).json({ error: 'Acesso não autorizado. Perfis permitidos: Supervisor, SuperAdmin, Admin' });
            }

            const postosSegurancas = await postoSegurancaModel.findAll();
            res.json(postosSegurancas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar seguranças atribuídos aos postos' });
        }
    },

    async getPostoSegurancaById(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Segurança do posto não encontrado' });
            }
            res.json(postoSeguranca);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar segurança atribuído por ID' });
        }
    },

    async updatePostoSeguranca(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;
        const { id_posto, n_mec } = req.body;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Segurança atribuído ao posto não encontrado' });
            }

            postoSeguranca.set({
                id_posto,
                n_mec,
                data_atualizacao: new Date(),
            });

            await postoSeguranca.save();

            res.json({ message: 'Segurança atribuído ao posto atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o segurança ao posto' });
        }
    },

    async deletePostoSeguranca(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Segurança atribuído ao posto não encontrado' });
            }

            await postoSeguranca.destroy();

            res.json({ message: 'Segurança atribuído ao posto excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o segurança atribuído ao posto' });
        }
    }
};