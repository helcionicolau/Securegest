const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dontenv = require("dotenv");
const morgan = require('morgan');
const routes = require('./routes');
const db = require("./utils/sequelize");
const app = express();

db.conexaoautenticao();

// Middleware para processar dados do corpo das requisições
app.use(bodyParser.urlencoded({ extended: false })); // Dados simples
app.use(bodyParser.json()); // Formato JSON

// Middleware para lidar com CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Usar as rotas definidas no arquivo index.js
app.use(
  express.json(), routes, express.urlencoded({ extended: false })
);

// Monitora toda a execução
app.use(morgan('dev'));

// CORS
// Servidores acessíveis para a API, nesse caso @Todos 
// Métodos que serão manipulados por esse servidor que vai acessar a API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Todos os endereços de servidores
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }

  next();
});


// Lidar com rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Lidar com erros internos do servidor (500)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

dontenv.config();
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://mysql-securegestdb.alwaysdata.net:${port}\n// Created by António Baptista #(24/08/2023)`);
})

// module.exports = app;

// Created by António Baptista #(24/08/2023)
