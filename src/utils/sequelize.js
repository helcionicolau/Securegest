const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");

// Defina os modelos
const UserModel = User(sequelize);

// Obtendo informações do banco de dados a partir de variáveis de ambiente
const DATABASE = process.env.MYSQL_DATABASE || "u102941870_securegest_db";
const USERNAME = process.env.MYSQL_USER || "u102941870_securegest";
const PASSWORD = process.env.MYSQL_PASSWORD || "ny@oRW!c8xV/";
const PORT = process.env.MYSQL_PORT || "3306";
const HOST = process.env.MYSQL_HOST || "localhost";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  dialect: "mysql",
  host: HOST,
  port: PORT,
  define: {
    timestamps: false,
  },
});

async function conexaoautenticacao() {
  try {
    await sequelize.authenticate();
    console.log("Conectado com sucesso ao banco de dados...");
  } catch (error) {
    console.error("Erro na conexão com o banco de dados: " + error);
  }
}

// Exporte o objeto Sequelize configurado e a função de autenticação
module.exports = { sequelize, conexaoautenticacao };
