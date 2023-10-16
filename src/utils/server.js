// Importando o HTTP
const http = require('https');
// Variavel para armazenar porta do servico
const port = process.env.PORT || 3000;

// Importando o APP dentro do Server.js
const app = require('../app');

// Criacao do Server para o APP
const server = http.createServer(app);
// Porta para o Server escutar
server.listen(port, () => {
    console.log(`Servidor rodando em https://bored-teal-fashion.cyclic.cloud/ Created by António Baptista #(24/08/2023)`);
});

// Created by António Baptista #(24/08/2023)
