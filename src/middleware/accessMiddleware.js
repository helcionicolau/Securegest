const RoleAccess = require('../models/roleaccess/Roleaccess'); // Importando o modelo de RoleAccess

// Middleware para verificar permissões de acesso
const accessMiddleware = (action) => {
    return async (req, res, next) => {
        try {
            // Pega o role_id e o departamento_id do funcionário logado
            const { role_id, departamento_id } = req.user; // Informações do funcionário logado no req.user

            // Verificar se o role_id e departamento_id foram passados corretamente
            if (!role_id || !departamento_id) {
                return res.status(403).json({ message: 'Permissão negada: Papel ou Departamento inválido.' });
            }

            // Consultar a tabela de RoleAccess para as permissões desse papel e departamento
            const roleAccess = await RoleAccess.findOne({
                where: {
                    role_id: role_id,
                    departamento_id: departamento_id
                }
            });

            if (!roleAccess) {
                return res.status(403).json({ message: 'Permissão negada: Nenhuma permissão encontrada para este papel e departamento.' });
            }

            // Verificando as permissões com base na ação
            switch (action) {
                case 'view':
                    if (!roleAccess.haview) {
                        return res.status(403).json({ message: 'Permissão negada: Visualizar não autorizado.' });
                    }
                    break;
                case 'add':
                    if (!roleAccess.haveadd) {
                        return res.status(403).json({ message: 'Permissão negada: Adicionar não autorizado.' });
                    }
                    break;
                case 'update':
                    if (!roleAccess.haveedit) {
                        return res.status(403).json({ message: 'Permissão negada: Atualizar não autorizado.' });
                    }
                    break;
                case 'delete':
                    if (!roleAccess.havedelete) {
                        return res.status(403).json({ message: 'Permissão negada: Excluir não autorizado.' });
                    }
                    break;
                default:
                    return res.status(400).json({ message: 'Ação não reconhecida.' });
            }

            // Se as permissões forem válidas, permitir o acesso
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Erro no middleware de acesso.', error: error.message });
        }
    };
};

// Exemplo de uso: Middleware aplicado a uma rota específica
// app.get('/departamento/:id', accessMiddleware('view'), departamentoController.getDepartamento);

module.exports = accessMiddleware;
