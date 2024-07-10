const express = require('express')
const mysql= require('mysql2/promise')
const bcrypt = require('bcrypt')
require('dotenv').config()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})
try{
    sequelize.authenticate()
            .then(()=>console.log('Connection to database ok')) 
            .catch(err => console.error(err))
}catch(err){console.error(err)}

module.exports = sequelize;