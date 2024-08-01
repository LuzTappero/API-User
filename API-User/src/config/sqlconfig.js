import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
import Sequelize from 'sequelize'


const sequelize = new Sequelize(
    process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})
try{
    await sequelize.authenticate()
            .then(()=>console.log('Connection to database ok')) 
            .catch(err => console.error(err))
    await sequelize.sync({ alter: true })
            .then(()=> console.log('Database synchronized'))
            .catch(err => console.error(err))
}catch(err){console.error(err)}



export default sequelize;


