const { categoryLogisticModel } = require('../../../models');

module.exports = {
  async createCategoriaMaterialLogistica(req, res) {
    const { nome, descricao } = req.body;

    try {
      const novaCategoria = await categoryLogisticModel.create({
        nome,
        descricao,
      });
      res.status(201).json({ novaCategoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar categoria material logistica' });
    }
  },

  async getAllCategoriasMateriaisLogisticas(req, res) {
    try {
      const categorias = await categoryLogisticModel.findAll();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar categorias material logistica' });
    }
  },

  async getCategoriaMaterialLogisticaById(req, res) {
    const categoriaId = req.params.categoriaId;

    try {
      const categoria = await categoryLogisticModel.findByPk(categoriaId);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria material logistica não encontrada' });
      }
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar categoria material logistica por ID' });
    }
  },

  async updateCategoriaMaterialLogistica(req, res) {
    const categoriaId = req.params.categoriaId;

    try {
      const categoria = await categoryLogisticModel.findByPk(categoriaId);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria material logistica não encontrada' });
      }

      // Update only the fields provided in the request body
      Object.keys(req.body).forEach((field) => {
        if (req.body[field] !== undefined) {
          categoria[field] = req.body[field];
        }
      });

      await categoria.save();

      res.json({ message: 'Categoria material logistica atualizada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar categoria material logistica' });
    }
  },

  async deleteCategoriaMaterialLogistica(req, res) {
    const categoriaId = req.params.categoriaId;

    try {
      const categoria = await categoryLogisticModel.findByPk(categoriaId);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria material logistica não encontrada' });
      }

      await categoria.destroy();

      res.json({ message: 'Categoria material logistica excluída com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir categoria material logistica' });
    }
  },
};
