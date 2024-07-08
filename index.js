const express = require('express');
const loginRoute = require('./routes/login.js');
const createUserRoute = require('./routes/createUser.js');
const musicasFavoritasRoute = require('./routes/musicasFavoritas.js');
const pesquisarMusicaRoute = require('./routes/pesquisarMusica.js');

const app = express();
const port = 3000;

// Middleware para processar JSON
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar as rotas


// Usar as rotas
app.use('/', loginRoute);
app.use('/', createUserRoute);
app.use('/', musicasFavoritasRoute);
app.use('/', pesquisarMusicaRoute);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// const button = document.querySelector('#listar')
// const lista = document.querySelector('#lista')


// button.addEventListener('click',async (e) =>{
//     const res = await fetch('https://swapi.dev/api/species');
//     const dados = await res.json()

//     dados.results.forEach(element => {
//         const elem = document.createElement('li')
//         elem.innerText = element.name

//         lista.append(elem)
//     });

// })
