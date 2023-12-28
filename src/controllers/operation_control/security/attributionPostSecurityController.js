const { postoSegurancaModel, postoSupervisorModel } = require('../../../models/index');

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

    async getAllPostosSegurancas(req, res) {
        try {
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