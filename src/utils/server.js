// Importando o módulo 'app'
const app = require('../app');

// Criacao do Server para o APP
const server = http.createServer(app);
// Porta para o Server escutar
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}\n// Created by António Baptista #(24/08/2023)`);
});

// Função para lidar com as solicitações HTTP
exports.handler = async (event) => {
  // Evento contém informações sobre a solicitação HTTP recebida
  const response = {
    statusCode: 200, // Código de status 200 (OK)
    body: JSON.stringify({ message: 'Seu aplicativo está funcionando!' }),
  };
  
  return response;
};
