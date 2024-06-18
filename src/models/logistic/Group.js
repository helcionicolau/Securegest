const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const Logistica = require("./Logistic");

const Conjunto = sequelize.define("conjunto_material_logistica", {
    id_cml: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id_cml",
    },
    descricao: {
      type: DataTypes.STRING,
      defaultValue: null,
      field: "descricao"
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
    tableName: "conjunto_material_logistica"
  });

Conjunto.belongsTo(Logistica, { foreignKey: "id_logistica", as: "logistica" });

module.exports = Conjunto;
