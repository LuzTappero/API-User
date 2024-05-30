'use strict'
const exp = require('constants');
const fs= require('fs/promises')
const express= require('express');
const path= require('path')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const readDB = require('../utils/read-db');
const { read } = require('fs');
const writeDB= require('../utils/write-db');
const { use } = require('../routes/user-routes');


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

    static async createUser(userData){
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
        }catch(err){
            console.error('Error to create a new User')
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

//esta línea de código realiza la siguiente operación:...users[userIndex]: Copia todas las propiedades del objeto que se encuentra en la posición userIndex del array users al nuevo objeto. Es decir, todas las propiedades del usuario original se copian en el nuevo objeto....userData: Copia todas las propiedades de userData al nuevo objeto. Si userData tiene propiedades que tienen el mismo nombre que las propiedades del objeto users[userIndex], las propiedades de userData sobrescribirán las propiedades del usuario original.La combinación de estos dos pasos produce un nuevo objeto que contiene todas las propiedades del usuario original, con cualquier propiedad adicional o modificada de userData.
  


module.exports = UserModel;