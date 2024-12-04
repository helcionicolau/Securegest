const jwt = require('jsonwebtoken');
const { employeesModel, roleModel, departamentsModel } = require('../models');

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

      // Obtém os detalhes do funcionário a partir do número mecânico
      const employeeData = await getEmployeeDataFromToken(decodedToken.n_mec);
      if (!employeeData) {
        return res.status(401).json({ error: 'Dados do funcionário não encontrados no token' });
      }

      // Adiciona os dados do funcionário (incluindo role_id, department_id e funcionario_id) à requisição
      req.user = {
        n_mec: decodedToken.n_mec,
        funcionario_id: decodedToken.funcionarioId, // Adicionando o ID do funcionário
        role_id: employeeData.role_id, // ID da função (role_id)
        departamento_id: employeeData.departamento_id, // ID do departamento
        roleName: employeeData.roleName, // Nome da função (role)
        empresa_id: employeeData.empresa_id
      };

      // Exibe as informações do funcionário no console
      console.log('Funcionário autenticado:', req.user);

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Autenticação falhou' });
    }
  }
};

// Função para obter os dados do funcionário (role_id e department_id) a partir do número mecânico
async function getEmployeeDataFromToken(n_mec) {
  try {
    // Consultar o funcionário pelo número mecânico (n_mec)
    const employee = await employeesModel.findOne({ 
      where: { n_mec },
      include: [
        { model: roleModel, as: 'papel' }, // Inclui a tabela de funções (roles)
        { model: departamentsModel, as: 'departamento' } // Inclui a tabela de departamentos
      ]
    });

    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    // Retornar os dados do funcionário, incluindo role_id, departamento_id, roleName e empresa_id
    return {
      role_id: employee.role_id,
      departamento_id: employee.departamento_id,
      roleName: employee.papel.nome, // Nome da função (role) a partir da associação com 'papel'
      empresa_id: employee.empresa_id
    };
  } catch (error) {
    console.error('Erro ao obter os dados do funcionário do token:', error);
    return null;
  }
}
