const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/login.js');
const createUserRoute = require('./routes/createUser.js');
const musicasFavoritasRoute = require('./routes/musicasFavoritas.js');
const pesquisarMusicaRoute = require('./routes/pesquisarMusica.js');

const app = express();
const port = 3000;

// Middleware para processar JSON e permitir CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Usar as rotas
app.use('/', loginRoute);
app.use('/', createUserRoute);
app.use('/', musicasFavoritasRoute);
app.use('/', pesquisarMusicaRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
