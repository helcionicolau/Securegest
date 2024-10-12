const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Departamento = require("../departments/Department");
const Municipio = require("../../counties/County");
const Empresa = require("../../company/Company");
const Papel = require("../../roles/Role");

const Funcionario = sequelize.define('funcionarios', {
  id_funcionario: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_funcionario"
  },
  n_mec: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "n_mec"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "sexo"
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "estado_civil"
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: "data_nascimento"
  },
  nif: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nif"
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "cargo"
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "role_id",
    references: {
      model: Papel,
      key: 'id_role'
    }
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "departamento_id",
    references: {
      model: Departamento,
      key: 'id_departamento'
    }
  },
  municipio_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "municipio_id",
    references: {
      model: Municipio,
      key: 'id_municipio'
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "email"
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "telefone"
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "senha"
  },
  isactive: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    field: "isactive"
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'OFFLINE',
    field: 'status'
  },
  photo_path: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0,
    field: "photo_path"
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'empresa_id',
    references: {
      model: Empresa,
      key: 'id_empresa'
    }
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
  tableName: "funcionarios",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Funcionario.belongsTo(Departamento, { foreignKey: 'departamento_id', as: 'departamento' });
Funcionario.belongsTo(Municipio, { foreignKey: 'municipio_id', as: 'municipio' });
Funcionario.belongsTo(Empresa, { foreignKey: 'empresa_id', as: 'empresa' });
Funcionario.belongsTo(Papel, { foreignKey: 'role_id', as: 'papel' });

module.exports = Funcionario;
