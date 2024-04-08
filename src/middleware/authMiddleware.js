const jwt = require('jsonwebtoken');
const { userModel, roleModel } = require('../models');

module.exports = {
  authenticateUserMiddleware: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_KEY || "whoami");

      // Verificação de validade do token
      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ error: 'Token expirado' });
      }

      // Obter o nome da função (role) do usuário a partir do token JWT
      const roleName = await getRoleNameFromToken(decodedToken.userId);
      if (!roleName) {
        return res.status(401).json({ error: 'Nome da função (role) não encontrado no token' });
      }

      // Adicionar os dados decodificados à solicitação para uso posterior
      req.userData = {
        userId: decodedToken.userId,
        scope: decodedToken.scope,
        roleName: roleName // Adicione o nome da função (role) à solicitação
      };

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Autenticação falhou' });
    }
  }
};

// Função para obter o nome da função (role) do usuário a partir do ID do usuário
async function getRoleNameFromToken(userId) {
  try {
    // Consultar o usuário para obter o role_id
    const user = await userModel.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const roleId = user.role_id;

    // Consultar a tabela de funções (roles) para obter o nome da função
    const role = await roleModel.findByPk(roleId);
    if (!role) {
      throw new Error('Função (Role) não encontrada');
    }

    return role.nome; // Retorna o nome da função (role)
  } catch (error) {
    console.error('Erro ao obter o nome da função (role) do token:', error);
    return null;
  }
}
