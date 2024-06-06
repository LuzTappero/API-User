const fs= require('fs/promises')
const path= require('path')


const dbPath = path.join(__dirname, "../../db", "db.json")
let users= []

async function readDB(){
    try{
        const data= await fs.readFile(dbPath, 'utf-8')
        users =JSON.parse(data);
        return users;
    }
    catch(err){
        console.error('Error reading the file', err);
    }
}
module.exports= readDB;