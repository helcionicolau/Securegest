const sequelize = require("sequelize");

const dontenv = require("dotenv");
dontenv.config();


const DATABASE = process.env.MYSQL_DATABASE || "u102941870_securegest_db";
const USERNAME = process.env.MYSQL_USER || "u102941870_securegest";
const PASSWORD = process.env.MYSQL_PASSWORD || "ny@oRW!c8xV/";
const CONFIG = {
  dialect: "mysql",
  port: process.env.MYSQL_PORT || "3306",
  host: process.env.MYSQL_HOST || "localhost",
  define: {
    timestamps: false,
  }
}

let db = {};

try {
  db = new sequelize(DATABASE, USERNAME, PASSWORD, CONFIG);
} catch (error) {
  console.error("Erro na conxeão com o banco de dados." + error);
}

async function conexaoautenticao() {

  try {
    await db.authenticate();
    console.log("Conectado com sucesso ao banco de dados...");
  } catch (error) {
    console.error("Erro na conxeão com o banco de dados." + error);
  }
}

Object.assign(db, {
  conexaoautenticao
});

module.exports = db;

// Created by António Baptista #(24/08/2023)
