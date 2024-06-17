const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dontenv = require("dotenv");
const morgan = require('morgan');
const routes = require('./routes');
const db = require("./utils/sequelize");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

db.conexaoautenticao();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
}));

app.use(
  express.json(), routes, express.urlencoded({ extended: false })
);

// app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    console.log('Options request received');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }

  next();
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

dontenv.config();
const port = process.env.PORT || 8080;

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Securegest',
      version: '1.0.0',
      description: 'Securegest API',
    },
  },
  apis: ['./routes/index*.js'],
};
const specs = swaggerJsdoc(options);

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Servidor rodando em http://mysql-securegestdb.alwaysdata.net:${port}\n// Created by António Baptista #(24/08/2023)`);
})

// Created by António Baptista #(24/08/2023)
