const express= require('express');
const readDB = require('../utils/read-db');
const writeDB= require('../utils/write-db');



class UserModel{
    static getAll= async()=>{
        const users= await readDB();
        return users;
    }

    static getById = async(id)=>{
        const users= await readDB();
        const userId= users.find(user => user.id === parseInt(id));
        if(!userId) return ('message: Id not found')
        return userId;
    }
    static async registerUser(userData){
        try{
            const users = await readDB();
            const newUser={
                id: users.length + 1,
                user: userData.user,
                password: userData.password,
                email: userData.email
            };
            users.push(newUser);
            await writeDB(users);
            return newUser;
        }catch(error){
            console.error('Error signing in:', error);
        }
    }
    static async deleteUser(id){
        const users= await readDB();
        const userIndex= users.findIndex(user => user.id === parseInt(id));
        if(userIndex === -1)return false;
        users.splice(userIndex,1);
        await writeDB(users);
        return true;
    }
    static async updateUser(id, userData){
        const users= await readDB();
        const userIndex= users.findIndex(user => user.id === parseInt(id));
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
