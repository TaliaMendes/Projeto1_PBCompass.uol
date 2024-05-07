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

app.post('/tutor', async (req, res) => {
  const { name, phone, email, date_of_birth, address } = req.body;
  
  if(!name || !phone || !email || !date_of_birth || !address){ //Verificando passagem de dados completa
    return res.status(400).json({ error: 'Todos os campos devem ser preenchidos.' })
  }
  else{
    await Tutor.create({ 
      name, phone, email, date_of_birth, address
    })
    .then((newTutor) => {
      console.log('Tutor criado com sucesso')
      res.status(200).json({message:'Um novo tutor foi criado:', Tutor: newTutor})
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({message:'Erro a criar o tutor', error: error})
    })
  }
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