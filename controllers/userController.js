const fs = require('fs');
const usersBd = 'bd/users.json';

const getUsers = () => {
  return JSON.parse(fs.readFileSync(usersBd, 'utf-8'));
};

function verifyUser(email, password) {
  const users = getUsers();

  const user = users.find(user => user.email === email);
  
  if (!user) return {message: 'Usuário não encontrado', status: 'error'};

  if (user.password !== password) return {message: 'Senha incorreta', status: 'error'};

  return {message: 'Usuário logado com sucesso', status: 'success'};
};

function addUser(username, email, password) {
  const users = getUsers();

  if (users.find(user => user.email === email)) {
    return {message: 'Email já cadastrado', status: 'error'};
  }
  
  users.push({
    id: users.length + 1, 
    username, 
    email, 
    password
  });
  
  try	{
    fs.writeFileSync(usersBd, JSON.stringify(users, null, 2));
    return {message: 'Usuário cadastrado com sucesso', status: 'success'};

  } catch (err) {
    return {message: 'Erro ao cadastrar usuário', status: 'error'};
  }

};

module.exports = {
  verifyUser,
  addUser,
};
