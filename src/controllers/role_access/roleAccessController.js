const { roleAccessModel, roleModel, menuModel } = require('../../models');

module.exports = {
  async createRoleAccess(req, res) {
    const { role_id, menu_id, haveedit, haveadd, havedelete } = req.body;

    try {
      const newRoleAccess = await roleAccessModel.create({
        role_id,
        menu_id,
        haveedit,
        haveadd,
        havedelete,
      });
      res.status(201).json({ message: 'Acesso de papel criado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar acesso de papel' });
    }
  },

  async getAllRoleAccess(req, res) {
    try {
      const roleAccesses = await sequelize.query(`
        SELECT role_access.id_rm, role_access.haveedit, role_access.haveadd, role_access.havedelete,
               role.id_role, role.nome AS role_nome,
               menu.id_menu, menu.nome AS menu_nome
        FROM role_access
        INNER JOIN roles AS role ON role_access.role_id = role.id_role
        INNER JOIN menus AS menu ON role_access.menu_id = menu.id_menu
      `);

      res.json(roleAccesses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar acessos de papel' });
    }
  },   

  async getRoleAccessById(req, res) {
    const roleAccessId = req.params.roleAccessId;

    try {
      const roleAccess = await roleAccessModel.findByPk(roleAccessId);
      if (!roleAccess) {
        return res.status(404).json({ error: 'Acesso de papel não encontrado' });
      }
      res.json(roleAccess);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar acesso de papel por ID' });
    }
  },

  async updateRoleAccess(req, res) {
    const roleAccessId = req.params.roleAccessId;

    try {
      const roleAccess = await roleAccessModel.findByPk(roleAccessId);
      if (!roleAccess) {
        return res.status(404).json({ error: 'Acesso de papel não encontrado' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          roleAccess[field] = req.body[field];
        }
      });

      await roleAccess.save();

      res.json({ message: 'Acesso de papel atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar acesso de papel' });
    }
  },

  async deleteRoleAccess(req, res) {
    const roleAccessId = req.params.roleAccessId;

    try {
      const roleAccess = await roleAccessModel.findByPk(roleAccessId);
      if (!roleAccess) {
        return res.status(404).json({ error: 'Acesso de papel não encontrado' });
      }

      await roleAccess.destroy();

      res.json({ message: 'Acesso de papel excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir acesso de papel' });
    }
  },
};
