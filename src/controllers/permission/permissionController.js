const { permissionModel } = require('../../models/index');

module.exports = {
    async registerPermissao(req, res) {
        try {
            const permissaoData = req.body;
            const newPermissao = await permissionModel.create(permissaoData);
            res.status(201).json({ message: 'Permissão registrada com sucesso!', permissao: newPermissao });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao registrar permissão.' });
        }
    },

    async getAllPermissoes(req, res) {
        try {
            const permissoes = await permissionModel.findAll();
            res.json(permissoes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar permissões' });
        }
    },

    async getPermissaoById(req, res) {
        const permissaoId = req.params.permissaoId;
        try {
            const permissao = await permissionModel.findByPk(permissaoId);
            if (!permissao) {
                return res.status(404).json({ error: 'Permissão não encontrada' });
            }
            res.json(permissao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar permissão por ID' });
        }
    },

    async updatePermissao(req, res) {
        const permissaoId = req.params.permissaoId;
        try {
            const permissao = await permissionModel.findByPk(permissaoId);
            if (!permissao) {
                return res.status(404).json({ error: 'Permissão não encontrada' });
            }
            await permissao.update(req.body);
            res.json({ message: 'Permissão atualizada com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar permissão' });
        }
    },

    async deletePermissao(req, res) {
        const permissaoId = req.params.permissaoId;
        try {
            const permissao = await permissionModel.findByPk(permissaoId);
            if (!permissao) {
                return res.status(404).json({ error: 'Permissão não encontrada' });
            }
            await permissao.destroy();
            res.json({ message: 'Permissão excluída com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir permissão' });
        }
    },
};
