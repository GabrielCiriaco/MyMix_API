const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');



// Rota para listar usuários
router.post('/createUser', (req, res) => {
  const {username, email, password} = req.body;
  const resposta = addUser(username, email, password);

  if(resposta.status === 'error') res.json( {message: resposta.message, status: 400});
  
  else res.json( {message: resposta.message, status: 200});
});

module.exports = router;