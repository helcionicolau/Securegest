// models/RoleAccess.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");
const Role = require("../roles/Role");
const Departamento = require("../rh/departments/Department");

const RoleAccess = sequelize.define('role_access', {
  id_rm: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_rm"
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "role_id",
    references: {
      model: Role,
      key: 'id_role'
    }
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "departamento_id",
    references: {
      model: Departamento,
      key: 'id_departamento'
    }
  },
  haview: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "haview"
  },
  haveedit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "haveedit"
  },
  haveadd: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "haveadd"
  },
  havedelete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "havedelete"
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: "role_access",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

RoleAccess.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
RoleAccess.belongsTo(Departamento, { foreignKey: 'departamento_id', as: 'departamento' });

module.exports = RoleAccess;
