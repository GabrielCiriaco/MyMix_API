const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/userController');



// Rota para listar usuários
router.post('/login', (req, res) => {
  const {email, password} = req.body;
  const resposta = verifyUser(email, password);

  if(resposta.status === 'error') res.json({message: resposta.message, status: 400});
  
  else res.json({message: resposta.message, status: 200});
});

module.exports = router;