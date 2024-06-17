const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const Logistica = require("./Logistic"); 
const Posto = require("../business_diretion/post/Post");
const Funcionario = require("../rh/employees/Employee");

const AtribuirLogistica = sequelize.define("atribuir_logistica", {
    id_al: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id_al",
    },
    id_logistica: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "id_logistica",
      references: {
        model: Logistica,
        key: "id",
      },
    },
    id_posto: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "id_posto",
      references: {
        model: Posto,
        key: "id_posto",
      },
    },
    id_funcionario: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "id_funcionario",
      references: {
        model: Funcionario,
        key: "id_funcionario",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    tableName: "atribuir_logistica"
  });

AtribuirLogistica.belongsTo(Logistica, { foreignKey: "id_logistica", as: "logistica" });
AtribuirLogistica.belongsTo(Posto, { foreignKey: "id_posto", as: "posto" });
AtribuirLogistica.belongsTo(Funcionario, { foreignKey: "id_funcionario", as: "funcionario" });

module.exports = AtribuirLogistica;
