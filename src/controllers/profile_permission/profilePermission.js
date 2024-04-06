const { profilePermissionModel } = require('../../models/index');

module.exports = {
    async associatePermissaoToPerfil(req, res) {
        try {
            const associacaoData = req.body;
            const novaAssociacao = await profilePermissionModel.create(associacaoData);
            res.status(201).json({ message: 'Associação criada com sucesso!', associacao: novaAssociacao });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao associar permissão ao perfil.' });
        }
    },

    async getAllAssociacoes(req, res) {
        try {
            const associacoes = await profilePermissionModel.findAll();
            res.json(associacoes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar associações' });
        }
    },

    async getAssociacaoById(req, res) {
        const associacaoId = req.params.associacaoId;
        try {
            const associacao = await profilePermissionModel.findByPk(associacaoId);
            if (!associacao) {
                return res.status(404).json({ error: 'Associação não encontrada' });
            }
            res.json(associacao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar associação por ID' });
        }
    },

    async deleteAssociacao(req, res) {
        const associacaoId = req.params.associacaoId;
        try {
            const associacao = await profilePermissionModel.findByPk(associacaoId);
            if (!associacao) {
                return res.status(404).json({ error: 'Associação não encontrada' });
            }
            await associacao.destroy();
            res.json({ message: 'Associação excluída com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir associação' });
        }
    },
};
