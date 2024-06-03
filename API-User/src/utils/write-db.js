const exp = require('constants');
const express= require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const path= require('path')
const fs= require('fs/promises')
const readDB = require('../utils/read-db.js');
const { read } = require('fs');
const dbPath= path.join(__dirname, "../../db", "db.json")

async function writeDB(data){
    try{
        await fs.writeFile(dbPath, JSON.stringify(data, null,  2), 'utf-8');
    } catch(error){
            console.error('Error writing to JSON File', error);
    }
}
module.exports= writeDB;

