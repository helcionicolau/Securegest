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

const Role = sequelize.define('roles', {
  id_role: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_role"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "descricao"
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
  tableName: "roles",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const Menu = sequelize.define('menus', {
  id_menu: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_menu"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  }
}, {
  tableName: "menus"
});


Role.belongsToMany(Menu, { through: RoleAccess,foreignKey: 'role_id' }); 
Menu.belongsToMany(Role, { through: RoleAccess, foreignKey: 'menu_id' });

module.exports = {
  RoleAccess,
  Role,
  Menu
};