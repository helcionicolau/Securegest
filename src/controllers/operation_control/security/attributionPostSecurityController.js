const { postoSegurancaModel } = require('../../../models/index');

module.exports = {
    async registerPostoSeguranca(req, res) {
        const { id_posto, n_mec } = req.body;

        try {
            // Verificar se já existe um registro para o id_posto
            const existingRecord = await postoSegurancaModel.findOne({
                where: { id_posto }
            });

            if (existingRecord) {
                // Se existe, adicionar os novos n_mec a esse registro existente
                await existingRecord.update({
                    n_mec: [...existingRecord.n_mec, ...n_mec],
                    data_atualizacao: new Date(),
                });

                res.status(201).json({ message: 'Seguranças atribuídos com sucesso ao posto existente' });
            } else {
                // Se não existe, criar um novo registro
                const newPostoSeguranca = await postoSegurancaModel.create({
                    id_posto,
                    n_mec,
                    data_registro: new Date(),
                });

                res.status(201).json({ message: 'Seguranças atribuídos com sucesso a um novo posto' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atribuir os seguranças ao posto' });
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