const { Op } = require('sequelize');
const { postoSegurancaModel, employeesModel, userProfileModel } = require('../../../models/index');

module.exports = {
    async getSegurancasDisponiveis(req, res) {
        try {
            // Obtém os seguranças já atribuídos a algum posto
            const segurancasAtribuidos = await postoSegurancaModel.findAll({
                attributes: ['n_mec'],
            });

            // Obtém os NMECs dos seguranças já atribuídos
            const nMecsAtribuidos = segurancasAtribuidos.map((item) => item.n_mec);

            // Obtém os seguranças que ainda não foram atribuídos a nenhum posto
            const segurancasDisponiveis = await employeesModel.findAll({
                where: {
                    n_mec: { [Op.notIn]: nMecsAtribuidos },
                    cargo: 'Seguranca',
                    // Adicione outras condições, se necessário
                },
            });

            res.json(segurancasDisponiveis);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar seguranças disponíveis' });
        }
    },

    async registerPostoSeguranca(req, res) {
        console.log('Perfil do usuário logado:', req.userData);
        const { id_posto, segurancas } = req.body;
        console.log('Corpo da requisição:', req.body);

        try {
            // Verifica se o usuário tem permissão para adicionar seguranças
            const userData = req.userData;

            if (!userData || !userData.id_perfil) {
                console.error('Erro de autorização: Dados do usuário ou ID de perfil ausentes.');
                return res.status(403).json({ error: 'Usuário não autorizado a adicionar seguranças' });
            }

            const perfil = await userProfileModel.findOne({
                where: { id_perfil: userData.id_perfil },
                attributes: ['nome'],
            });

            if (!perfil) {
                console.error('Erro de autorização: Perfil não encontrado.');
                return res.status(403).json({ error: 'Usuário não autorizado a adicionar seguranças' });
            }

            if (!['Supervisor', 'SuperAdmin', 'Admin'].includes(perfil.nome)) {
                console.error('Erro de autorização: Perfil não autorizado.');
                return res.status(403).json({ error: 'Usuário não autorizado a adicionar seguranças' });
            }

            if (!id_posto) {
                return res.status(400).json({ error: 'O campo id_posto é obrigatório' });
            }

            const segurancasAtribuidos = await postoSegurancaModel.findAll({
                where: { id_posto },
                attributes: ['n_mec'],
            });

            // Verifica se há seguranças atribuídos antes de chamar map
            const nMecsAtribuidos = segurancasAtribuidos ? segurancasAtribuidos.map((item) => item.n_mec) : [];

            // Filtra os seguranças que ainda não foram atribuídos
            const segurancasNaoAtribuidos = segurancas.filter((n_mec) => !nMecsAtribuidos.includes(n_mec));

            // Cria os novos registros apenas para seguranças não atribuídos
            const newSegurancas = await postoSegurancaModel.bulkCreate(
                segurancasNaoAtribuidos.map((n_mec) => ({ id_posto, n_mec })),
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
        const { n_mec } = req.body;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Segurança do posto não encontrado' });
            }

            postoSeguranca.set({
                n_mec,
                data_atualizacao: new Date(),
            });

            await postoSeguranca.save();

            res.json({ message: 'Segurança do posto atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o segurança do posto' });
        }
    },

    async deletePostoSeguranca(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;

        try {
            const postoSeguranca = await postoSegurancaModel.findByPk(postoSegurancaId);
            if (!postoSeguranca) {
                return res.status(404).json({ error: 'Segurança do posto não encontrado' });
            }

            await postoSeguranca.destroy();

            res.json({ message: 'Segurança do posto excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o segurança do posto' });
        }
    }
};
