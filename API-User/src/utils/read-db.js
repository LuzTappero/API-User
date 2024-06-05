const fs= require('fs/promises')
const path= require('path')


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