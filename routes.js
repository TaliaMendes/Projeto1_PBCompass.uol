const express     = require('express')
const router      = express.Router()
const bodyParser  = require('body-parser')
const Pet         = require('./models/Pet')
const Tutor       = require('./models/Tutor')

//rotas tutors
router.get('/tutors', async (req, res) => {
  const tutors = await Tutor.findAll({raw:true}) //capturando todos os tutores
  res.status(200).send(tutors)
})

router.post('/tutor', async (req, res) => {
  const { name, phone, email, date_of_birth, address } = req.body
  
  if(!name || !phone || !email || !date_of_birth || !address){ //Verificar passagem de dados completa
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

router.put('/tutor/:id', async (req, res) => {
  const id = req.params.id //capturando id para update por Routes Params
 
  const dataTutor = { //capturando dados para atualização 
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    address: req.body.address
  } 

  // Verificar se o tutor existe 
  const tutor = await Tutor.findByPk(id) 
  if (!tutor) {
    return res.status(404).json({ error: 'Tutor não encontrado' })
  }

  //Se o tutor existir realiza a atualização
  await Tutor.update(dataTutor, { where: {id: id} }) //passando dados e identificação para realizar a atualização
    .then(() => {
      res.status(200).json({message: 'Tutor foi atualizado com sucesso:'})
    })    
    .catch((error) => {
      console.log(error)
      res.status(500).json(error)
    })
})

router.delete('/tutor/:tutorid', async (req, res) => {
  const tutorid = req.params.tutorid 

  //Verificar se o tutor existe para remover
  const tutor = await Tutor.findByPk(tutorid) 
  if (!tutor) {
    return res.status(404).json({ error: 'Tutor não encontrado' })
  }

  await Tutor.destroy({ where: {id : tutorid}})
  .then(() => {
    res.status(200).json({message: 'Tutor foi removido com sucesso!'})
  })
  .catch((error) => {
    onsole.log(error)
    res.status(500).json(error)
  })
})

//rotas pets
router.get('/pets', async (req, res) => {
  const pets = await Pet.findAll({raw:true}) //capturando todos os tutores
  res.status(200).send(pets)
})

router.post('/pet/:tutorid', async (req, res) => {
  const tutorid = req.params.tutorid
  const { name, species , weight, date_of_birth} = req.body

  //Verificar se o tutor existe para adicionar um pet
  const tutor = await Tutor.findByPk(tutorid) 
  if (!tutor) {
    return res.status(404).json({ error: 'Tutor não encontrado para registro de um novo pet' })
  }

  //Criar novo pet e adicionar o tutor
  Pet.create(
    { name, species , weight, date_of_birth,  tutorId: tutorid })
  .then((newPet) => {
    res.status(200).json({message:'Um novo pet foi criado:', Pet: newPet})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({message:'Erro a criar o tutor'})
  })
})

router.put('/pet/:id/tutor/:tutorid', async (req, res) => {
  const id = req.params.id
 
  const updatePEt = {
    name: req.body.name,
    species: req.body.species,
    weight: req.body.weight,
    date_of_birth: req.body.date_of_birth,
    tutorid : req.params.tutorid
  }
  
  // Verificar se o pet existe
  const pet = await Pet.findByPk(id) 
  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' })
  }

  await Pet.update(updatePEt, {where : {id : id}, returning: true})
  .then(() => {
    res.status(200).json({message: 'Pet atualizado com sucesso'})
  })    
  .catch((error) => {
    console.log(error)
    res.status(500).json(error)
  })
})

router.delete('/pet/:petid/tutor/:tutorId', async (req, res) => {
  const id = req.params.petid
  const tutorId = req.params.tutorId

  // Verificar se o pet existe
  const pet = await Pet.findByPk(id)
  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' })
  }

  // Verificar se o pet pertence ao tutor referenciado e realizar a remoção
  if (String(pet.tutorId) === tutorId) {  //foi necessário converter o dado numérico -> string para realizar a comparação
    await Pet.destroy({ where: { id: id } })
      .then(() => {
        res.status(200).json({ message: 'Pet removido com sucesso!' })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json(error)
      })
  } else {
    return res.status(404).json({ error: 'Este Pet não pertence ao tutor referenciado' })
  }
})

module.exports = router;