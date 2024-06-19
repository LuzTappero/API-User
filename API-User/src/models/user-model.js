const express= require('express');
const readDB = require('../utils/read-db');
const writeDB= require('../utils/write-db');
const bcrypt= require('bcrypt')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const { v4: uuidv4 } = require('uuid');

class UserModel{
    static getAll= async()=>{
        const users= await readDB();
        return users;
    }
    static getById = async(id)=>{
        const users= await readDB();
        const userId= users.find(user => user.id === (id));
        if(!userId) return ('message: Id not found')
        return userId;
    }
    static async getByUsername(username){
        const users= await readDB();
        const findUser = users.find(user=> user.username === username)
        return findUser;
    }
    static async comparePassword (inputPassword, storedPassword){
        return await bcrypt.compare(inputPassword,storedPassword)
    }
    static async registerUser({ username, password, email, }){
         try{
            let users= await readDB();
                const existingUser= users.find(user=>user.username === username);
                const existingEmail= users.find(user => user.email=== email)
                    if (existingUser){return false;}
                    if (existingEmail){return false;}
            const hashedPassword= await bcrypt.hash(password,10);
            const newUser={
                id: uuidv4(),
                username: username,
                password: hashedPassword,
                email: email
            };
            users.push(newUser);
            await writeDB(users);
            return true;
        }catch(errors){
            throw new Error (` throw new Error('Error registering user ${errors}`)
        }
    }
    static async deleteUser(id){
        const users= await readDB();
        const userIndex= users.findIndex(user => user.id === (id));
        if(userIndex === -1)return false;
        users.splice(userIndex,1);
        await writeDB(users);
        return true;
    }
    static async updateUser(id, userData){
        const users= await readDB();
        const userIndex= users.findIndex(user => user.id ===(id));
        if(userIndex === -1)return false;
        users[userIndex] = {
            ...users[userIndex],
            ...userData
        };
        await writeDB(users);
        return users[userIndex];
    }
}
module.exports = UserModel;
