const fs = require('fs');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const usersBd = 'bd/users.json';

const getUsers = () => {
  return JSON.parse(fs.readFileSync(usersBd, 'utf-8'));
};

function verifyUser(email, password) {
  const users = getUsers();
  const user = users.find(user => user.email === email);
  
  if (!user) return { message: 'Usuário não encontrado', status: 404 };

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return { message: 'Senha incorreta', status: 401 };

  const token = jwt.sign({ userid: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { message: 'Usuário logado com sucesso', status: 200 , token };
}

function addUser(username, email, password) {
  const users = getUsers();

  if (users.find(user => user.email === email)) {
    return { message: 'Email já cadastrado', status: 409 };
  }

  if (!password) {
    return { message: 'Senha é obrigatória', status: 400 };
  }

  // Certifique-se de que a senha está sendo passada corretamente
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  users.push({
    id: users.length + 1, 
    username, 
    email, 
    password: hashedPassword
  });

  try {
    fs.writeFileSync(usersBd, JSON.stringify(users, null, 2));
    return { message: 'Usuário cadastrado com sucesso', status: 200 };
  } catch (err) {
    return { message: 'Erro ao cadastrar usuário', status: 400 };
  }
}

function changePassword(email, oldPassword, newPassword) {
  const users = getUsers();
  const user = users.find(user => user.email === email);

  if (!user) return { message: 'Usuário não encontrado', status: 404 };

  const validPassword = bcrypt.compareSync(oldPassword, user.password);
  if (!validPassword) return { message: 'Senha incorreta', status: 401 };

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  user.password = hashedPassword;

  try {
    fs.writeFileSync(usersBd, JSON.stringify(users, null, 2));
    return { message: 'Senha alterada com sucesso', status: 200 };
  } catch (err) {
    return { message: 'Erro ao alterar senha', status: 500 };
  }
}

module.exports = {
  verifyUser,
  addUser,
  changePassword,
};
