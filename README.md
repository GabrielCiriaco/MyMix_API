# MyMix

## Visão Geral

Esse é o código do backend da aplicação Myix.
MyMix é um aplicativo para gerenciamento de músicas, com ele você poderá pesquisar por suas músicas e salva-las, tendo acesso à suas letras e informações como autor e álbum

## Autores
- Gabriel Ciriaco Fornitano
- Bruno
- Matheus

## Funcionalidades

- Gerenciamento de Autores
- Gerenciamento de Músicas
- Gerenciamento de Músicas Favoritas

## Rotas
- <b>/login</b> (email, password)
	-  retorna sucesso caso usuário e senha corretos ({message: 'Usuário logado com sucesso', status: 200})
	- retorna erro em caso de usuário não cadastrado ({message: 'Email já cadastrado', status: 400})
	- retorna erro  caso senha incorreta ({message: 'Senha incorreta', status: 400})

<br>

- <b>/createUser</b> (username, email, password)
	- retorna sucesso em caso de cadastro com sucesso ({message: 'Usuário cadastrado com sucesso', status: 200})
	- retorna erro em caso de falha ao cadastrar ({message: 'Email já cadastrado', status: 400})
	- retorna erro caso usuário já cadastrado ({message: 'Erro ao cadastrar usuário', status: 400})

