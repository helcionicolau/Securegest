const { postoSegurancaModel } = require('../../../models/index');


module.exports = {
    async registerPostoSeguranca(req, res) {
        const { id_posto, segurancas } = req.body;
    
        try {
            // Verifica se o id_posto e segurancas estão presentes na requisição
            if (!id_posto || !segurancas || !Array.isArray(segurancas)) {
                return res.status(400).json({ error: 'Campos id_posto e segurancas são obrigatórios' });
            }
    
            // Cria os novos registros para cada segurança
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
