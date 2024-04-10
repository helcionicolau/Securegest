const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const ProjetoDepartamento = require("../projects_departments/ProjectDepartment");
const Funcionario = require("../../rh/employees/Employee");

const FuncionarioTarefa = sequelize.define('funcionarios_tarefas', {
  id_ft: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_ft"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  data_inicio: {
    type: DataTypes.DATEONLY, // Use DATEONLY for date without time
    allowNull: true,
    field: "data_inicio"
  },
  data_fim_prevista: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: "data_fim_prevista"
  },
  estado_tarefa: {
    type: DataTypes.ENUM('Pedido','Em Progresso','Feito'),
    allowNull: false,
    field: "estado_tarefa"
  },
  progresso: {
    type: DataTypes.STRING(25),
    allowNull: true,
    field: "progresso"
  },
  id_projeto_departamento: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "id_projeto_departamento",
    references: {
      model: ProjetoDepartamento,
      key: 'id_pd'
    }
  },
  id_funcionario: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "id_funcionario",
    references: {
      model: Funcionario,
      key: 'id_funcionario'
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
  tableName: "funcionarios_tarefas",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// After defining model, associate them
FuncionarioTarefa.belongsTo(ProjetoDepartamento, { through: 'funcionarios_tarefas', foreignKey: "id_projeto_departamento", as: 'projeto_departamento'  });
FuncionarioTarefa.belongsTo(Funcionario, { through: 'funcionarios_tarefas', foreignKey: "id_funcionario", as: 'funcionario'  });

module.exports = FuncionarioTarefa;

