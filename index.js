const express     = require('express')
const connection  = require('./db/connection')
const bodyParser  = require('body-parser');
const Pet         = require('./models/Pet')
const Tutor       = require('./models/Tutor');
const { where } = require('sequelize');

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

app.put('/tutor/:id', async (req, res) => {
  const id = req.params.id //capturando id para update por Routes Params
 
  const dataTutor = { //capturando dados para atualização 
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    address: req.body.address
  } 

  await Tutor.update(dataTutor, { where: {id: id} }) //passando dados e identificação para realizar a atualização
    .then(() => {
      res.status(200).json({message: 'Tutor foi atualizado com sucesso:'})
    })    
    .catch((error) => {
      console.log(error)
      res.status(500).json(error)
    })
})

app.delete('/tutor/:id', async (req, res) => {
  const id = req.params.id 

  await Tutor.destroy({ where: {id : id}})
  .then(() => {
    res.status(200).json({message: 'Tutor foi removido com sucesso!'})
  })
  .catch((error) => {
    onsole.log(error)
    res.status(500).json(error)
  })
})

app.post('/pet/:tutorid', async (req, res) => {
  const tutorid = req.params.tutorid

   const tutor = await Tutor.findByPk(tutorid); // Verificar se o tutor existe
   if (!tutor) {
     return res.status(404).json({ error: 'Tutor não encontrado' });
   }

  const { name, species , weight, date_of_birth} = req.body;
  
  Pet.create(
    { name, species , weight, date_of_birth,  tutorId: tutorid })
  .then((newPet) => {
    res.status(200).json({message:'Um novo pet foi criado:', Pet: newPet})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({message:'Erro a criar o tutor', error: error})
  })
})

app.put('/pet/:petid/tutor/:tutorid', async (req, res) => {
  const petid = req.params.petid
 
  const updatePEt = {
    name: req.body.name,
    species: req.body.species,
    weight: req.body.weight,
    date_of_birth: req.body.date_of_birth,
    tutorid : req.params.tutorid
  }
  
  await Pet.update(updatePEt, {where : {id : petid}, returning: true})
  .then(() => {
    res.status(200).json({message: 'Pet atualizado com sucesso'})
  })    
  .catch((error) => {
    console.log(error)
    res.status(500).json(error)
  })
})

app.delete('/pet/:petid/tutor/:tutorid', async (req, res) => {
  const petid = req.params.petid
  //const tutorid = req.params.tutorid

  await Pet.destroy({where: {id : petid}})
  res.send('ola')

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