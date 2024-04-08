const { roleModel } = require('../../models');

module.exports = {
  async createRole(req, res) {
    const { nome, descricao } = req.body;

    try {
      const newRole = await roleModel.create({ nome, descricao });
      res.status(201).json({ message: 'Perfil criado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar perfil' });
    }
  },

  async getAllRoles(req, res) {
    try {
      const roles = await roleModel.findAll();
      res.json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar perfis' });
    }
  },

  async getRoleById(req, res) {
    const roleId = req.params.roleId;

    try {
      const role = await roleModel.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }
      res.json(role);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar perfil por ID' });
    }
  },

  async updateRole(req, res) {
    const roleId = req.params.roleId;

    try {
      const role = await roleModel.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          role[field] = req.body[field];
        }
      });

      await role.save();

      res.json({ message: 'Perfil atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  },

  async deleteRole(req, res) {
    const roleId = req.params.roleId;

    try {
      const role = await roleModel.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }

      await role.destroy();

      res.json({ message: 'Perfil excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir perfil' });
    }
  },
};
