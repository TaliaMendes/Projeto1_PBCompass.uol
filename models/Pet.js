const Sequelize         = require('sequelize')
const { DataTypes }     = require('sequelize')// tem acesso ao tipo de dados(string, boolean etc)
const db                = require('../db/connection')
const Tutor             = require('./Tutor')
const { FOREIGNKEYS }   = require('sequelize/lib/query-types')

const Pet = db.define('pet', {
  name: {
    type: Sequelize.STRING
  }, 

  species: {
    type: Sequelize.STRING
  },
  
  weight: {
    type: Sequelize.NUMBER
  },

  date_of_birth: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false // Desabilita os campos createdAt e updatedAt
})

Tutor.hasMany(Pet, {    //um tutor pode ter varios pets
  foreignkey: 'tutor_id'
}) 
Pet.belongsTo(Tutor)    //cada pet deve ter apenas um tutor

module.exports = Pet
