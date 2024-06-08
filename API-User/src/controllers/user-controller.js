const path= require('path')
const UserModel= require('../models/user-model.js');
const dotenv= require("dotenv")
dotenv.config()
const bcrypt= require('bcrypt');
const express= require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


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
    static async profiles(req,res){
        res.sendFile((path.join(__dirname, '../views', 'profiles.html')))
    }
    static async home(req,res){
        res.sendFile((path.join(__dirname, '../views', 'home.html')))
    }
    static async showFormSignIn(req, res){
        await res.sendFile(path.join(__dirname, '../views', 'sign-in.html'));
    }
    static async showFormLogin(req,res){
        res.sendFile(path.join(__dirname, '../views', 'login.html'));
    }
    static async registerUser(req,res){
        try{
            //procesa la lógica del registro:
            const { username, password, email } = req.body;
            const result= await UserModel.registerUser({ username, password, email });
            if(result === true){
                res.sendFile((path.join(__dirname, '../views', 'sign-inOK.html')));
            }else{
                res.status(400).send('Those credentials already exists');
            }
        }catch(error){
            res.status(400).send(error.message);
        };
    }
    static async logInUser(req,res){
        try{
            const { username, password } = req.body;
            const user = await UserModel.getByUsername(username)
            if(user && await UserModel.comparePassword(password, user.password))
                {req.session.userId = user.id;
                req.session.isLogged = true;
                res.redirect('/user/profiles')}
            else{
                res.status(401).send('Invalid credentials')}
            }catch(err){      
                res.status(500).send('Internal server error');
        }
    }
    static async logOut(req, res){
        const isLogged= req.session.isLogged;
        if(!isLogged){
            return res.status(401).sendFile(path.join(__dirname, '../views', 'expired.html'))
        }
        req.session.destroy(err =>{
            if (err){
                return res.status(500).send('Error loggin out')
            }
            res.clearCookie('connect.sid');
            res.redirect('/user/home');
        });
    }
    static async deleteUser(req, res){
        const id= (req.params.id);
        try{
            const result= await UserModel.deleteUser(id);
            if (result == false){
                return res.sendFile((path.join(__dirname, '../views', '404notfound.html')))
            }
            return res.json({message: 'User deleted'})
        }
        catch(error){
            console.log('Error:',error);
            res.status(500).send({ error: 'Failed to delete user' });
        }
       
    }
    static async updateUser(req,res){
        try{
            const id= req.params.id;
            const userData= req.body;
            const updatedUser = await UserModel.updateUser(id, userData);
            if (updatedUser === false) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(updatedUser);
        }
        catch(error){
            console.log('Error:', error);
            res.status(500).send({ error: 'Failed to update user' });
        }
    }     
}

module.exports= UserController;






