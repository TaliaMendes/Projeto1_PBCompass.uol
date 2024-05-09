const { DataTypes}  = require('sequelize')
const db            = require('../db/connection')

const Tutor = db.define('tutor', {
  name: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  date_of_birth: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  } 
  
}, {
  timestamps: false // Desabilita os campos createdAt e updatedAt
})

module.exports = Tutor;
