const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Perfil = require("../profile/profile");
const Permissao = require("../permission/Permission");

const ProfilePermission = db.define('perfis_permissoes', {
  id_pp: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_pp"
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "perfil_id"
  },
  permissao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "permissao_id"
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

// Relacionamento entre ProfilePermission, Perfil e Permissao
ProfilePermission.belongsTo(Perfil, { foreignKey: 'perfil_id' });
ProfilePermission.belongsTo(Permissao, { foreignKey: 'permissao_id' });

module.exports = ProfilePermission;
