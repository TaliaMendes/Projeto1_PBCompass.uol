## Projeto VetClinic | 1° Desafio NODE.Js + AWS
O presente projeto tem como principal objetivo implementar uma aplicação web que replica uma clínica veterinária, permitindo a gestão de tutores e pets através das operações CRUD (Create, Read, Update, Delete). Utilizando tecnologias como Express.js, SQLite, ORM Sequelize e Insomnia para testar as rotas HTTP.

## Tecnologias Utilizadas
- Node.js
- SQLite
- ORM Sequelize
- Express.js
- Insomnia
  
## Pré-requesitos
- Node.js 
- Gerenciador de pacotes npm ou yarn
- Insomnia, ou qualquer outro framework para desenvolvimento/teste de API Clients

## Instalações 
- Clone este repositório: `git clone https://github.com/TaliaMendes/Projeto1_PBCompass.uol.git`
- Instale as dependencias com: `npm install` ou `yarn install`
- Execute o arquivo `index.js` com o comando `node index.js`

## Como Utilizar
  - Tutores
      - Para visualizar todos os tutores, faça uma requisição GET para `/tutors`
      - Para criar um tutor, faça uma requisição POST para `/tutor` com os dados do tutor no corpo da requisição.
      - Para atualizar um tutor, faça uma requisição PUT para `/tutor/:id` com os novos dados no corpo da requisição.
      - Para deletar um tutor, faça uma requisição DELETE para `/tutor/:id`
  - Pets
      - Para visualizar todos os pets, faça uma requisição GET para `/pets`
      - Para criar um pet juntamente com seu tutor, faça uma requisição POST para `/pet/:tutorid` com o id do tutor na URL e com os dados do pet no corpo da requisição.
      - Para atualizar um pet, faça uma requisição PUT para `/pet/:id/tutor/:tutorid` com o id do pet, o id do tutor e com os novos dados do pet no corpo da requisição.
      - Para deletar um pet, faça uma requisição DELETE para `/pet/:petid/tutor/:tutorid`com o id do pet e o id do tutor     

## Exemplo de Requisições
 - Tutores
     - Dados na URL:  `http://localhost:3005/tutor/2`
     - Dados no corpo da requisição: `{
	        "name": "Ana",
		"phone": "3195263582",
		"email": "meuemailAna@gmail.com",
		"date_of_birth": "27/08/1989",
		"address": "Rua A 20"
       }`
       
 - Pets
    - Dados na URL: `http://localhost:3005/pet/9/tutor/1`
    - Dados no corpo da requisição: `{
	        "name": "black",
	        "species": "felino",
	        "weight": "3",
	        "date_of_birth": "20/09/2023"
       }`
