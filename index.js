const express     = require('express')
const connection  = require('./db/connection')
const bodyParser  = require('body-parser');
const Pet         = require('./models/Pet')
const Tutor       = require('./models/Tutor');

const app = express()
const PORT = 3005

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false})); //receber conteúdos do body 

//rotas
app.get('/tutors', async (req, res) => {
  const tutors = await Tutor.findAll({raw:true}) //capturando todos os tutores
  res.status(200).send(tutors)
})


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