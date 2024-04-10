const { employeesModel, departamentsModel } = require('../../../models/index');

module.exports = {
  async registerFuncionario(req, res) {
    const {
      n_mec,
      nome,
      sexo,
      estado_civil,
      data_nascimento,
      nif,
      cargo,
      data_contratacao,
      departamento_id,
      carga_horaria_diaria
    } = req.body;

    try {
      const newFuncionario = await employeesModel.create({
        n_mec,
        nome,
        sexo,
        estado_civil,
        data_nascimento,
        nif,
        cargo,
        data_contratacao,
        departamento_id,
        carga_horaria_diaria,
      });

      res.status(201).json({ message: 'Funcionário registrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar funcionário' });
    }
  },

  async getAllFuncionarios(req, res) {
    try {
      const funcionarios = await employeesModel.findAll({
        include: [{ model: departamentsModel, as: 'departamento' }]
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
  },

  async getFuncionarioById(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId, {
        include: [{ model: departamentsModel, as: 'departamento' }]
      });
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      res.json(funcionario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionário por ID' });
    }
  },

  async getFuncionariosByCargo(req, res) {
    const { cargo } = req.params;

    try {
      const funcionarios = await employeesModel.findAll({
        where: { cargo },
        include: [{ model: departamentsModel, as: 'departamento' }]
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários pelo cargo' });
    }
  },

  async getFuncionariosByDepartamentoId(req, res) {
    const { departamentoId } = req.params;

    try {
      const funcionarios = await employeesModel.findAll({
        where: { departamento_id: departamentoId },
        include: [{ model: departamentsModel, as: 'departamento' }]
      });

      res.json(funcionarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar funcionários pelo departamento ID' });
    }
  },

  async updateFuncionario(req, res) {
    const funcionarioId = req.params.funcionarioId;
    const updateFields = req.body;

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys(updateFields).forEach((field) => {
        if (updateFields[field] !== undefined) {
          funcionario[field] = updateFields[field];
        }
      });

      await funcionario.save();

      res.json({ message: 'Funcionário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar funcionário' });
    }
  },

  async deleteFuncionario(req, res) {
    const funcionarioId = req.params.funcionarioId;

    try {
      const funcionario = await employeesModel.findByPk(funcionarioId);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      await funcionario.destroy();

      res.json({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir funcionário' });
    }
  },
};
