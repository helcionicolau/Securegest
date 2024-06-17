const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Defina as opções do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Securegest',
      version: '1.0.0',
      description: 'Securegest API',
    },
  },
  apis: ['./src/routes/index*.js'],
};

// Inicialize o swagger-jsdoc
const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
