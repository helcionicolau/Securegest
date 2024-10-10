const jwt = require('jsonwebtoken');
const { employeesModel, roleModel } = require('../models');

module.exports = {
  authenticateUserMiddleware: async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      // Chave secreta
      const secretKey = process.env.JWT_KEY || 'kndio289y32niw0h10';

      // Decodifica o token JWT
      const decodedToken = jwt.verify(token, secretKey);

      // Verifica se o token expirou
      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ error: 'Token expirado' });
      }

      // Obtém o nome da função (role) do funcionário a partir do token
      const roleName = await getRoleNameFromToken(decodedToken.n_mec);
      if (!roleName) {
        return res.status(401).json({ error: 'Nome da função (role) não encontrado no token' });
      }

      // Adiciona os dados do funcionário decodificados à requisição
      req.userData = {
        n_mec: decodedToken.n_mec,
        scope: decodedToken.scope,
        roleName: roleName // Nome da função (role)
      };

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Autenticação falhou' });
    }
  }
};

// Função para obter o nome da função (role) do funcionário a partir do número mecânico
async function getRoleNameFromToken(n_mec) {
  try {
    // Consultar o funcionário para obter o role_id
    const employee = await employeesModel.findOne({ where: { n_mec } });
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    const roleId = employee.role_id;

    // Consultar a tabela de funções (roles) para obter o nome da função
    const role = await roleModel.findByPk(roleId);
    if (!role) {
      throw new Error('Função (Role) não encontrada');
    }

    console.log('Nome da função (role) do funcionário:', role.nome); // Log para imprimir o nome da função (role)

    return role.nome; // Retorna o nome da função (role)
  } catch (error) {
    console.error('Erro ao obter o nome da função (role) do token:', error);
    return null;
  }
}
