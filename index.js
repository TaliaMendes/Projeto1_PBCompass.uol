const express     = require('express')
const connection  = require('./db/connection')
const bodyParser  = require('body-parser');
const Pet         = require('./models/Pet')
const Tutor       = require('./models/Tutor');

const app = express()
const PORT = 3005


//Verificando conexão do banco de dados SQlite
connection.authenticate()
.then(() => {
  console.log('Banco de dados conectado com sucesso')
})
.catch((error) => {
  console.log(error)
})


//Inicializando o servidor
app.listen(PORT, () => {
  console.log('Servidor rodando com sucesso!')
})