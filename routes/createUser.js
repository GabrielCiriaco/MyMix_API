const express = require('express');
const router = express.Router();
const { addUser, changePassword } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');




// Rota para listar usuários
router.post('/createUser', (req, res) => {
  const {username, email, password} = req.body;
  const resposta = addUser(username, email, password);

  res.status(respsta.status).json({message: resposta.message});
});

router.put('/changePassword', authenticateToken, (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const resposta = changePassword(email, oldPassword, newPassword);
  
  res.status(resposta.status).json(resposta.message);
});

module.exports = router;