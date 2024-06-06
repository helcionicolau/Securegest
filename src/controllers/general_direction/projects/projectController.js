const { projectsModel, positionModel } = require( '../../../models/index' );

module.exports = {
  async createProjeto( req, res ) {
    const {
      descricao,
      sumario,
      tipo_projeto,
      id_posicao,
    } = req.body;

    try {
      const novoProjeto = await projectsModel.create( {
        descricao,
        sumario,
        tipo_projeto,
        id_posicao,
      } );

      res.status( 201 ).json( { message: 'Projeto criado com sucesso!' } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao criar projeto' } );
    }
  },

  async getAllProjetos( req, res ) {
    try {
      const projetos = await projectsModel.findAll( {
        include: [{ model: positionModel, as: 'posicao' }],
      } );

      res.json( projetos );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao buscar projetos' } );
    }
  },

  async getProjetoById( req, res ) {
    const projetoId = req.params.projetoId;

    try {
      const projeto = await projectsModel.findByPk( projetoId, {
        include: [{ model: positionModel, as: 'posicao' }],
      } );
      if ( !projeto ) {
        return res.status( 404 ).json( { error: 'Projeto não encontrado' } );
      }

      res.json( projeto );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao buscar projeto por ID' } );
    }
  },

  async getProjetosByPosicaoId( req, res ) {
    const { posicaoId } = req.params;

    try {
      const projetos = await projectsModel.findAll( {
        where: { id_posicao: posicaoId },
        include: [{ model: positionModel, as: 'posicao' }],
      } );

      res.json( projetos );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao buscar projetos por ID da posição' } );
    }
  },

  async updateProjeto( req, res ) {
    const projetoId = req.params.projetoId;
    const updateFields = req.body;

    try {
      const projeto = await projectsModel.findByPk( projetoId );
      if ( !projeto ) {
        return res.status( 404 ).json( { error: 'Projeto não encontrado' } );
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys( updateFields ).forEach( ( field ) => {
        if ( updateFields[field] !== undefined ) {
          projeto[field] = updateFields[field];
        }
      } );

      await projeto.save();

      res.json( { message: 'Projeto atualizado com sucesso' } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao atualizar projeto' } );
    }
  },

  async deleteProjeto( req, res ) {
    const projetoId = req.params.projetoId;

    try {
      const projeto = await projectsModel.findByPk( projetoId );
      if ( !projeto ) {
        return res.status( 404 ).json( { error: 'Projeto não encontrado' } );
      }

      await projeto.destroy();

      res.json( { message: 'Projeto excluído com sucesso' } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao excluir projeto' } );
    }
  },
};