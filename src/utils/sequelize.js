const sequelize = require("sequelize");

const dontenv = require("dotenv");

dontenv.config();


const database = 'securegestdb_master';
const username = '331882_sec';
const db_password = 'kjdhi%%##$' ;
const db_config = {
    dialect: "mysql", port: "3306", host: 'mysql-securegestdb.alwaysdata.net',
    define: { 
        timestamps: false,
    }
}

let db = {};

try {
    db = new sequelize(database,username,db_password,db_config);
} catch (error) {
    console.error("Erro na conexão com a base de dados..." + error);
}

async function conexaoautenticao(){

    try {
        await db.authenticate();
        console.log("Conectado ao banco de dados...");
    } catch (error) {
        console.error("Erro na sua conexão com a Base de dado." + error);
    }
}

//console.log(db);
Object.assign(db,{
    conexaoautenticao
});

module.exports = db;
