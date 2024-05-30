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


async function writeDB(users){
    try{
        await fs.writeFile(dbPath, JSON.stringify(users, null,  2));
    } catch(error){
            console.error('Error writing to JSON File', error);
    }
}


    // try{
    //     if (!userData || !userData.user || !userData.password || !userData.email || !userData.id) {
    //         throw new Error('Invalid user data');
    //     }
        
module.exports= writeDB;
