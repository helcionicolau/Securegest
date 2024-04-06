const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");
const ProfilePermission = require("./profile_permission");

const Permissao = db.define('permissoes', {
  id_permissao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_permissao"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
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
});

// Relacionamento entre Permissao e ProfilePermission
Permissao.belongsToMany(ProfilePermission, { through: 'perfis_permissoes', foreignKey: 'permissao_id' });

module.exports = Permissao;
