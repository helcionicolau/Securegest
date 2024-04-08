const { menuModel } = require('../../models');

module.exports = {
  async createMenu(req, res) {
    const { nome, descricao } = req.body;

    try {
      const newMenu = await menuModel.create({ nome, descricao });
      res.status(201).json({ message: 'Menu criado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar menu' });
    }
  },

  async getAllMenus(req, res) {
    try {
      const menus = await menuModel.findAll();
      res.json(menus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar menus' });
    }
  },

  async getMenuById(req, res) {
    const menuId = req.params.menuId;

    try {
      const menu = await menuModel.findByPk(menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu não encontrado' });
      }
      res.json(menu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar menu por ID' });
    }
  },

  async updateMenu(req, res) {
    const menuId = req.params.menuId;

    try {
      const menu = await menuModel.findByPk(menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu não encontrado' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          menu[field] = req.body[field];
        }
      });

      await menu.save();

      res.json({ message: 'Menu atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar menu' });
    }
  },

  async deleteMenu(req, res) {
    const menuId = req.params.menuId;

    try {
      const menu = await menuModel.findByPk(menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu não encontrado' });
      }

      await menu.destroy();

      res.json({ message: 'Menu excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir menu' });
    }
  },
};
