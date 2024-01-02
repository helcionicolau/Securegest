const { postoSegurancaModel, postoSupervisorModel, userModel, userProfileModel, postModel, employeesModel } = require('../../../models/index');

module.exports = {
    async registerPostoSeguranca(req, res) {
        const data = req.body;
        const userId = req.userData.userId;

        try {
            // Verifica se o usuário é um supervisor cadastrado
            const supervisor = await postoSupervisorModel.findOne({
                where: { id_usuario: userId }
            });

            if (!supervisor) {
                // Verifica se o usuário é "SuperAdmin" ou "Admin"
                const usuario = await userModel.findByPk(userId);
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }

                const perfilId = usuario.id_perfil;

                if (perfilId !== 3 && perfilId !== 4 && perfilId !== 6) {
                    return res.status(403).json({ error: 'Acesso não autorizado. Apenas supervisores, SuperAdmin ou Admin podem registrar seguranças.' });
                }
            } else {
                // Verifica se o supervisor está atribuído ao posto
                const supervisorPosto = await postoSupervisorModel.findOne({
                    where: { id_usuario: userId, id_posto: data[0].id_posto }
                });

                if (!supervisorPosto) {
                    return res.status(403).json({ error: 'Acesso não autorizado. O supervisor não está atribuído a este posto.' });
                }
            }

            // Iterar sobre cada objeto no array
            for (const record of data) {
                const { id_posto, n_mec } = record;

                // Verifica se o n_mec já existe na tabela postoSegurancaModel
                const existeMec = await postoSegurancaModel.findOne({
                    where: { n_mec }
                });

                if (existeMec) {
                    return res.status(400).json({ error: `O n_mec ${n_mec} já está registrado.` });
                }

                // Verifica o limite de seguranças permitido para o posto
                const posto = await postModel.findByPk(id_posto);
                if (!posto) {
                    return res.status(404).json({ error: 'Posto não encontrado' });
                }

                // Verifica se o número de seguranças já atingiu o limite
                const segurancasRegistrados = await postoSegurancaModel.count({
                    where: { id_posto }
                });

                if (segurancasRegistrados >= posto.n_operadores) {
                    return res.status(403).json({ error: 'Limite de seguranças atingido para este posto.' });
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
        const userId = req.userData.userId;

        try {
            // Verifica se o usuário é um supervisor cadastrado
            const supervisor = await postoSupervisorModel.findOne({
                where: { id_usuario: userId }
            });

            if (!supervisor) {
                // Verifica se o usuário é "SuperAdmin" ou "Admin"
                const usuario = await userModel.findByPk(userId);
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }

                const perfilId = usuario.id_perfil;

                if (perfilId !== 3 && perfilId !== 4 && perfilId !== 6) {
                    return res.status(403).json({ error: 'Acesso não autorizado. Apenas supervisores, SuperAdmin ou Admin podem visualizar seguranças.' });
                }
            } else {
                // Se for um supervisor, verifica se o supervisor está atribuído ao posto específico
                if (!supervisor.id_posto) {
                    return res.status(403).json({ error: 'Acesso não autorizado. Supervisor não atribuído a um posto específico.' });
                }

                // Busca todos os postos de segurança
                const postosSegurancas = await postoSegurancaModel.findAll({
                    where: { id_posto: supervisor.id_posto }
                });

                res.json(postosSegurancas);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar seguranças atribuídos aos postos' });
        }
    },

    async getAllSegurancaFuncionarios(req, res) {
        try {
            const segurancaFuncionarios = await employeesModel.findAll({
                where: { cargo: 'Seguranca' },
            });

            if (!segurancaFuncionarios || segurancaFuncionarios.length === 0) {
                return res.status(404).json({ error: 'Nenhum funcionário com cargo de Segurança encontrado' });
            }

            res.json(segurancaFuncionarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar funcionários com cargo de Segurança' });
        }
    },

    async getPostoSegurancaById(req, res) {
        const postoSegurancaId = req.params.postoSegurancaId;
    
        try {
            // Verifica se o usuário é um supervisor cadastrado e está atribuído ao posto
            const supervisorPosto = await postoSupervisorModel.findOne({
                where: { id_usuario: req.userData.userId, id_posto: postoSegurancaId }
            });
    
            if (!supervisorPosto) {
                // Verifica se o usuário é "SuperAdmin" ou "Admin"
                const usuario = await userModel.findByPk(req.userData.userId);
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }
    
                const perfilId = usuario.id_perfil;
    
                if (perfilId !== 3 && perfilId !== 4 && perfilId !== 6) {
                    return res.status(403).json({
                        error: 'Acesso não autorizado. Apenas SuperAdmin, Admin ou Supervisor associado ao posto podem visualizar seguranças por ID.'
                    });
                }
            }
    
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
            // Verifica se o usuário é um supervisor cadastrado e está atribuído ao posto
            const supervisorPosto = await postoSupervisorModel.findOne({
                where: { id_usuario: req.userData.userId, id_posto }
            });

            if (!supervisorPosto) {
                // Verifica se o usuário é "SuperAdmin" ou "Admin"
                const usuario = await userModel.findByPk(req.userData.userId);
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }

                const perfilId = usuario.id_perfil;

                if (perfilId !== 3 && perfilId !== 4 && perfilId !== 6) {
                    return res.status(403).json({ error: 'Acesso não autorizado. Apenas SuperAdmin, Admin ou Supervisor associado ao posto podem atualizar seguranças.' });
                }
            }

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
            // Verifica se o usuário é um supervisor cadastrado e está atribuído ao posto
            const supervisorPosto = await postoSupervisorModel.findOne({
                where: { id_usuario: req.userData.userId, id_posto: postoSeguranca.id_posto }
            });

            if (!supervisorPosto) {
                // Verifica se o usuário é "SuperAdmin" ou "Admin"
                const usuario = await userModel.findByPk(req.userData.userId);
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }

                const perfilId = usuario.id_perfil;

                if (perfilId !== 3 && perfilId !== 4 && perfilId !== 6) {
                    return res.status(403).json({ error: 'Acesso não autorizado. Apenas SuperAdmin, Admin ou Supervisor associado ao posto podem excluir seguranças.' });
                }
            }

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
    },
};