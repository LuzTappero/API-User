'use strict'
const exp = require('constants');
const express= require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const UserModel= require('../models/user-model.js')

class UserController{
    static async getAll(req,res){
        const getAllUsers= await UserModel.getAll();
        res.send(getAllUsers);
    }

    static async getById(req,res){
        const id= req.params.id;
        const getById= await UserModel.getById(id);
        res.send(getById);
    }
    static async createUser(req,res){
        try{
            const userData= req.body;
            const newUser= await UserModel.createUser(userData);
            res.status(201).send(newUser);
        }
        catch (error) {
            console.error('Error in createUser controller:', error);
            res.status(500).send({ error: 'Failed to add user' });
        }
    }
    static async deleteUser(req, res){
        const id= (req.params.id);
        const result= await UserModel.deleteUser(id);
        if (result == false){
            return res.status(404).json({message: 'User not found'})
        }
        return res.json({message: 'User deleted'})
    }

    static async updateUser(req,res){
        const id= req.params.id;
        const userData= req.body;
        const updatedUser = await UserModel.updateUser(id, userData);
        if (updatedUser === false) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(updatedUser);
    }
}

module.exports= UserController;






