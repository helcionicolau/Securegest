const { DataTypes } = require("sequelize");
const db = require("../../utils/sequelize");
import { roleModel } from "../roles/Role";
import { menuModel } from "../menus/Menu";

const RoleAccess = db.define('role_access', {
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

module.exports = RoleAccess;

roleModel.belongsToMany(menuModel, { through: RoleAccess });
menuModel.belongsToMany(roleModel, { through: RoleAccess });