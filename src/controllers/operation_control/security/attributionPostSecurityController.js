const { postoSegurancaModel } = require('../../../models/index');
const { Op } = require('sequelize');

module.exports = {
    async registerPostoSeguranca(req, res) {
        const { id_posto, segurancas } = req.body;

        try {
            const newSegurancas = await postoSegurancaModel.bulkCreate(
                segurancas.map((n_mec) => ({ id_posto, n_mec })),
                {
                    returning: true,
                    individualHooks: true,
                }
            );

            res.status(201).json({ message: 'Seguranças atribuídos com sucesso ao posto', segurancas: newSegurancas });
        } catch (error) {
            console.error('Erro ao atribuir seguranças ao posto:', error);
            res.status(500).json({ error: 'Erro ao atribuir seguranças ao posto' });
        }
    },

    async getAllPostosSegurancas(req, res) {
        try {
            const postosSegurancas = await postoSegurancaModel.findAll();
            res.json(postosSegurancas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar postos atribuídos aos seguranças' });
        }
    },

    async getPostoSegurancaById(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Posto do segurança não encontrado' });
            }
            res.json(postoSeguranca);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar posto atribuído por ID' });
        }
    },

    async updatePostoSeguranca(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;
        const { id_posto, n_mec } = req.body;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Posto atribuído ao segurança não encontrado' });
            }

            postoSeguranca.set({
                id_posto,
                n_mec,
                data_atualizacao: new Date(), // Adicionando a data de atualização
            });

            await postoSeguranca.save();

            res.json({ message: 'Posto atribuído ao segurança atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o posto ao segurança' });
        }
    },

    async deletePostoSeguranca(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Posto atribuído ao segurança não encontrado' });
            }

            await postoSeguranca.destroy();

            res.json({ message: 'Posto atribuído ao segurança excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o posto atribuído ao segurança' });
        }
    }
};
