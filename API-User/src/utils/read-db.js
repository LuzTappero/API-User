const exp = require('constants');
const fs= require('fs/promises')
const express= require('express');
const path= require('path')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const dbPath = path.join(__dirname, "../../db", "db.json")

async function readDB(){
    try{
        const data= await fs.readFile(dbPath, 'utf-8')
        return JSON.parse(data);
    }
    catch(err){
        console.error('Error reading the file', err);
        return [];
    }
}

module.exports= readDB;