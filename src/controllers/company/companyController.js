const { companyModel } = require('../../models/index');

module.exports = {
  async createEmpresa(req, res) {
    const { nome_empresa, descricao_empresa, endereco_empresa, email_empresa, telefone_empresa, website_empresa } = req.body;

    try {
      const newEmpresa = await companyModel.create({
        nome_empresa,
        descricao_empresa,
        endereco_empresa,
        email_empresa,
        telefone_empresa,
        website_empresa,
      });

      res.status(201).json({ message: 'Empresa criada com sucesso!', empresa: newEmpresa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar empresa' });
    }
  },

  async getAllEmpresas(req, res) {
    try {
      const empresas = await companyModel.findAll();
      res.json(empresas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar empresas' });
    }
  },

  async getEmpresaById(req, res) {
    const empresaId = req.params.empresaId;

    try {
      const empresa = await companyModel.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      res.json(empresa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar empresa por ID' });
    }
  },

  async updateEmpresa(req, res) {
    const empresaId = req.params.empresaId;
    const updateFields = req.body;

    try {
      const empresa = await companyModel.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(updateFields).forEach(async (field) => {
        if (updateFields[field] !== undefined) {
          empresa[field] = updateFields[field];
        }
      });

      await empresa.save();

      res.json({ message: 'Empresa atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar empresa' });
    }
  },

  async deleteEmpresa(req, res) {
    const empresaId = req.params.empresaId;

    try {
      const empresa = await companyModel.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      await empresa.destroy();

      res.json({ message: 'Empresa excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir empresa' });
    }
  }
};
