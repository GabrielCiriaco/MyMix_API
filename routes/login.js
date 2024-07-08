const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/userController');



// Rota para listar usuários
router.post('/login', (req, res) => {
  const {email, password} = req.body;
  const resposta = verifyUser(email, password);

  if (resposta.status === 200) {
    res.status(resposta.status).json({
      message: resposta.message,
      token: resposta.token
    });
  }
  else{
    res.status(resposta.status).json({
      message: resposta.message
    });
  }

});

module.exports = router;