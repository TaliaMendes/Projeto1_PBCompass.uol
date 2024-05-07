//Realizando as configurações de conexão do banco de dados com a biblioteca sequelize. 
//È uma biblioteca ORM que vai facilitar a integração e utilização do banco de dados SQlite.
const Sequelize = require('sequelize') 

const connectionBd = new Sequelize({
  dialect: 'sqlite',
  storage: './db/vet.db', //local do arquivo SQlite
})

module.exports = connectionBd