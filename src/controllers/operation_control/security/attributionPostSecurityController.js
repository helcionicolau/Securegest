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
        const { id_posto, segurancas } = req.body;

        try {
            const userData = req.userData;

            if (!userData || !userData.id_perfil) {
                console.error('Erro de autorização: Dados do usuário ou ID de perfil ausentes.');
                return res.status(403).json({ error: 'Usuário não autorizado a adicionar seguranças' });
            }

            const perfil = await userProfileModel.findOne({
                where: { id_perfil: userData.id_perfil },
                attributes: ['nome'],
            });

            if (!perfil || !['Supervisor', 'SuperAdmin', 'Admin'].includes(perfil.nome)) {
                console.error('Erro de autorização: Perfil não autorizado.');
                return res.status(403).json({ error: 'Usuário não autorizado a adicionar seguranças' });
            }

            if (!id_posto) {
                return res.status(400).json({ error: 'O campo id_posto é obrigatório' });
            }

            const newSegurancas = [];
 
            for (const n_mec of segurancas) {
                const existingSeguranca = await postoSegurancaModel.findOne({
                    where: { id_posto, n_mec },
                    attributes: ['n_mec'],
                });

                if (!existingSeguranca) {
                    // Cria o registro apenas se não existir
                    const createdSeguranca = await postoSegurancaModel.create({
                        id_posto,
                        n_mec,
                        data_registro: new Date(),
                    });

                    newSegurancas.push(createdSeguranca);
                }
            }

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