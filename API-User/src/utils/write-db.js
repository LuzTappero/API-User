const path= require('path')
const fs= require('fs/promises')


const dbPath= path.join(__dirname, "../../db", "db.json")
async function writeDB(data){
    try{
        await fs.writeFile(dbPath, JSON.stringify(data, null,  2), 'utf-8');
    } catch(error){
            console.error('Error writing to JSON File', error);
    }
}
module.exports= writeDB;

