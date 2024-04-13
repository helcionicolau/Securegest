const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Funcionario = require("../../rh/employees/Employee");
const Posto = require("../post/Post");

const PostoSeguranca = sequelize.define('posto_segurancas', {
  id_ps: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_ps"
  },
  id_funcionario: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "id_funcionario",
    references: {
      model: Funcionario,
      key: 'id_funcionario'
    }
  },
  id_posto: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "id_posto",
    references: {
      model: Posto,
      key: 'id_posto'
    }
  },
  tempo_entrada: {
    type: DataTypes.DATE, // Use DATE for date without time
    allowNull: true,
    field: "tempo_entrada"
  },
  tempo_saida: {
    type: DataTypes.DATE, // Use DATE for date without time
    allowNull: true,
    field: "tempo_saida"
  },
  createdAt: {
    type: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: "posto_segurancas",
});

// Associations (optional)
PostoSeguranca.belongsTo(Funcionario, { foreignKey: "id_funcionario" });
PostoSeguranca.belongsTo(Posto, { foreignKey: "id_posto" });

module.exports = PostoSeguranca;