const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const RoleAccess = sequelize.define('role_access', {
  id_rm: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_rm"
  },
  role_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "role_id"
  },
  menu_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "menu_id"
  },
  haveedit: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: false,
    field: "haveedit"
  },
  haveadd: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: false,
    field: "haveadd"
  },
  havedelete: {
    type: DataTypes.TINYINT,
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

