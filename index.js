const express = require('express');
const loginRoute = require('./routes/login.js');
const createUserRoute = require('./routes/createUser.js');
const app = express();
const port = 3000;

// Middleware para processar JSON
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar as rotas


// Usar as rotas
app.use('/', loginRoute);
app.use('/', createUserRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});