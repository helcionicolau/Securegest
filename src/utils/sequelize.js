const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Obtendo informações do banco de dados a partir de variáveis de ambiente
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_HOST,
} = process.env;

// Configuração da instância do Sequelize
const sequelize = new Sequelize({
  dialect: "mysql",
  host: MYSQL_HOST || "localhost",
  port: MYSQL_PORT || 3306,
  username: MYSQL_USER || "u102941870_securegest",
  password: MYSQL_PASSWORD || "ny@oRW!c8xV/",
  database: MYSQL_DATABASE || "u102941870_securegest_db",
  define: {
    timestamps: false,
  },
});

// Função para autenticar a conexão com o banco de dados
async function conexaoautenticacao() {
  try {
    await sequelize.authenticate();
    console.log("Conectado com sucesso ao banco de dados...");
  } catch (error) {
    console.error("Erro na conexão com o banco de dados: " + error);
  }
}

// Exporte a instância do Sequelize configurada e a função de autenticação
module.exports = { sequelize, conexaoautenticacao };
