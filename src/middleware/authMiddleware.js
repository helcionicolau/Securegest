const jwt = require('jsonwebtoken');

module.exports = {
  authenticateUserMiddleware: (req, res, next) => {
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

      // Verificação de escopo (exemplo: apenas usuários autenticados)
      if (!decodedToken.scope.includes('user')) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      // Adicionar os dados decodificados à solicitação para uso posterior
      req.userData = {
        userId: decodedToken.userId,
        id_perfil: decodedToken.id_perfil,
        scope: decodedToken.scope
      };

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Autenticação falhou' });
    }
    checkPermissions([3, 4])(req, res, next);
  },

  checkPermissions: (allowedRoles) => (req, res, next) => {
    const { id_perfil } = req.userData;

    if (allowedRoles.includes(id_perfil)) {
      next();
    } else {
      res.status(403).json({ error: 'Acesso não autorizado' });
    }
  },
};

// Created by António Baptista #(24/08/2023)