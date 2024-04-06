const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");
const ProfilePermission = require("./profile_permission");

const Perfil = db.define('perfis', {
  id_perfil: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_perfil"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
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

// Relacionamento entre Perfil e ProfilePermission
Perfil.belongsToMany(ProfilePermission, { through: 'perfis_permissoes', foreignKey: 'perfil_id' });

module.exports = Perfil;
