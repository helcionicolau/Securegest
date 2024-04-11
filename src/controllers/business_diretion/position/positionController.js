// controllers/PosicaoController.js

const { positionModel, zoneModel, clientsModel, countyModel, employeesModel } = require( '../../../models' );

module.exports = {
  async registerPosicao( req, res ) {
    const {
      nome, descricao, id_zona, id_cliente, n_postos, id_municipio,
      id_funcionario, latitude, longitude
    } = req.body;

    try {
      const newPosicao = await positionModel.create( {
        nome,
        descricao,
        id_zona,
        id_cliente,
        n_postos,
        id_municipio,
        id_funcionario,
        latitude,
        longitude
      } );

      res.status( 201 ).json( { message: 'Posição criada com sucesso!' } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao criar posição' } );
    }
  },

  async getAllPosicoes( req, res ) {
    try {
      const posicoes = await positionModel.findAll( {
        include: [
          { model: zoneModel, as: 'zona' },
          { model: clientsModel, as: 'cliente' },
          { model: countyModel, as: 'municipio' },
          { model: employeesModel, as: 'funcionario' }
        ]
      } );

      res.json( posicoes );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao buscar posições' } );
    }
  },

  async getPosicaoById( req, res ) {
    const posicaoId = req.params.posicaoId;

    try {
      const posicao = await positionModel.findByPk( posicaoId, {
        include: [
          { model: zoneModel, as: 'zona' },
          { model: clientsModel, as: 'cliente' },
          { model: countyModel, as: 'municipio' },
          { model: employeesModel, as: 'funcionario' }
        ]
      } );
      if ( !posicao ) {
        return res.status( 404 ).json( { error: 'Posição não encontrada' } );
      }
      res.json( posicao );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao buscar posição por ID' } );
    }
  },

  async updatePosicao( req, res ) {
    const posicaoId = req.params.posicaoId;

    try {
      const posicao = await positionModel.findByPk( posicaoId );
      if ( !posicao ) {
        return res.status( 404 ).json( { error: 'Posição não encontrada' } );
      }

      // Atualiza apenas os campos fornecidos na requisição
      Object.keys( req.body ).forEach( ( field ) => {
        if ( req.body[field] !== undefined ) {
          posicao[field] = req.body[field];
        }
      } );

      await posicao.save();

      res.json( { message: 'Posição atualizada com sucesso' } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao atualizar posição' } );
    }
  },

  async deletePosicao( req, res ) {
    const posicaoId = req.params.posicaoId;

    try {
      const posicao = await positionModel.findByPk( posicaoId );
      if ( !posicao ) {
        return res.status( 404 ).json( { error: 'Posição não encontrada' } );
      }

      await posicao.destroy();

      res.json( { message: 'Posição excluída com sucesso' } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'Erro ao excluir posição' } );
    }
  }
};
