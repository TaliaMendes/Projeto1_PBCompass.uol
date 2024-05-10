const express     = require('express')
const connection  = require('./db/connection')
const bodyParser  = require('body-parser');
const routes = require('./routes');
const app = express()
const PORT = 3005

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false})); //receber conteúdos do body 

app.use(routes)
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