const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");
const UserProfile = require("../user_profile/userProfile");

const Usuario = db.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_usuario"
  },
  nome_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome_usuario"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: "email"
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "senha"
  },
  is_active: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "is_active"
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: "telefone"
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

// Relacionamento entre Usuario e UserProfile
Usuario.hasMany(UserProfile, { foreignKey: 'id_usuario' });

module.exports = Usuario;
