const express = require('express')
const connection = require('./db/connection')

const app = express()
const PORT = 3005

const tutores = []

app.use(express.json())



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