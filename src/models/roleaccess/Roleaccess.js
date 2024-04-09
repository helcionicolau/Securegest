const db = require( "../../utils/sequelize" );
const { DataTypes } = require( "sequelize" );
const Role = require( "../roles/Role" );
const Menu = require( "../menus/Menu" )

module.exports = db.define( 'role_access', {
  id_pam: {
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
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
} );

// Define a relação com as tabelas Menu e Role.
RoleAccess.belongsToMany( Menu, { through: 'role_access' } );
Menu.belongsToMany( RoleAccess, { through: 'role_access' } );

RoleAccess.belongsToMany( Role, { through: 'role_access' } );
Role.belongsToMany( RoleAccess, { through: 'role_access' } );

