// Importando o módulo 'app'
const app = require('../app');

// Função para lidar com as solicitações HTTP
exports.handler = async (event) => {
  // Evento contém informações sobre a solicitação HTTP recebida
  const response = {
    statusCode: 200, // Código de status 200 (OK)
    body: JSON.stringify({ message: 'Seu aplicativo está funcionando!' }),
  };
  
  return response;
};
