const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.json({ message: 'token nao fornecido', status: 403 });
  }
  console.log('Token recebido:', token);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ message: 'Token inválido', status: 403 });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
