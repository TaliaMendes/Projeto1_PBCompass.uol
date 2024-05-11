//Realizando as configurações de conexão do banco de dados com a biblioteca sequelize. 
//È uma biblioteca ORM que vai facilitar a integração e utilização do banco de dados SQlite.
const Sequelize = require('sequelize');
require('dotenv').config()

const connectionBd = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.CAMINHO_SQLITE, //local do arquivo SQlite
})

module.exports = connectionBd