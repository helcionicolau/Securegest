const { projectDepartmentModel, projectsModel, departamentsModel } = require('../../../models/index');

module.exports = {
  async createProjetoDepartamento(req, res) {
    const {
      descricao,
      id_projeto,
      id_departamento,
    } = req.body;

    try {
      const novoProjetoDepartamento = await projectDepartmentModel.create({
        descricao,
        id_projeto,
        id_departamento,
      });

      res.status(201).json({ message: 'Associação entre projeto e departamento criada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar associação entre projeto e departamento' });
    }
  },

  async getAllProjetosDepartamentos(req, res) {
    try {
      const projetosDepartamentos = await projectDepartmentModel.findAll({
        include: [{ model: projectsModel, as: 'projeto' }, { model: departamentsModel, as: 'departamento' }],
      });

      res.json(projetosDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações entre projetos e departamentos' });
    }
  },

  async getProjetoDepartamentoById(req, res) {
    const projetoDepartamentoId = req.params.projetoDepartamentoId;

    try {
      const projetoDepartamento = await projectDepartmentModel.findByPk(projetoDepartamentoId, {
        include: [{ model: projectsModel, as: 'projeto' }, { model: departamentsModel, as: 'departamento' }],
      });
      if (!projetoDepartamento) {
        return res.status(404).json({ error: 'Associação entre projeto e departamento não encontrada' });
      }

      res.json(projetoDepartamento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associação entre projeto e departamento por ID' });
    }
  },

  async getProjetosDepartamentosByProjetoId(req, res) {
    const { projetoId } = req.params;

    try {
      const projetosDepartamentos = await projectDepartmentModel.findAll({
        where: { id_projeto: projetoId },
        include: [{ model: projectsModel, as: 'projeto' }, { model: departamentsModel, as: 'departamento' }],
      });

      res.json(projetosDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações entre projetos e departamentos por ID do projeto' });
    }
  },

  async getProjetosDepartamentosByDepartamentoId(req, res) {
    const { departamentoId } = req.params;

    try {
      const projetosDepartamentos = await projectDepartmentModel.findAll({
        where: { id_departamento: departamentoId },
        include: [{ model: projectsModel, as: 'projeto' }, { model: departamentsModel, as: 'departamento' }],
      });

      res.json(projetosDepartamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar associações entre projetos e departamentos por ID do departamento' });
    }
  },

  async updateProjetoDepartamento(req, res) {
    const projetoDepartamentoId = req.params.projetoDepartamentoId;
    const updateFields = req.body;
  
    try {
      const projetoDepartamento = await projectDepartmentModel.findByPk(projetoDepartamentoId);
      if (!projetoDepartamento) {
        return res.status(404).json({ error: 'Associação entre projeto e departamento não encontrada' });
      }
  
      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(updateFields).forEach((field) => {
        if (updateFields[field] !== undefined) {
          projetoDepartamento[field] = updateFields[field];
        }
      });
  
      await projetoDepartamento.save();
  
      res.json({ message: 'Associação entre projeto e departamento atualizada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar associação entre projeto e departamento' });
    }
  },

  async deleteProjetoDepartamento(req, res) {
    const projetoDepartamentoId = req.params.projetoDepartamentoId;
  
    try {
      const projetoDepartamento = await projectDepartmentModel.findByPk(projetoDepartamentoId);
      if (!projetoDepartamento) {
        return res.status(404).json({ error: 'Associação entre projeto e departamento não encontrada' });
      }
  
      await projetoDepartamento.destroy();
  
      res.json({ message: 'Associação entre projeto e departamento excluída com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir associação entre projeto e departamento' });
    }
  }  

};
