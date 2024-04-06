const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Usuario = require("./user");
const Perfil = require("./perfil");

const UserProfile = db.define('usuario_perfis', {
  id_up: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_up"
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_usuario"
  },
  id_perfil: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_perfil"
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

// Relacionamento entre UserProfile, Usuario e Perfil
UserProfile.belongsTo(Usuario, { foreignKey: 'id_usuario' });
UserProfile.belongsTo(Perfil, { foreignKey: 'id_perfil' });

module.exports = UserProfile;
