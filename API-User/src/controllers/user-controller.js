const path= require('path')
const UserModel= require('../models/user-model.js');

class UserController{
    static async getAll(req,res){
        try{
            const allUsers= await UserModel.getAll();
            res.status(200).send(allUsers);
        }
        catch(error){
            console.error('Error fetching all users:', error);
            res.status(500).send('Internal Server Error'); 
        }
    }
    static async getById(req,res){
        const {id}= req.params;
        try{
            const userId= await UserModel.getById({id});
            res.status(200).send(userId);
        }
        catch(error){
            console.error('Error fetching user by ID:', error);
            res.status(500).send('Internal Server Error'); 
        }
    }
    static async profiles(req,res){
        try{
            res.status(200).sendFile((path.join(__dirname, '../views', 'profiles.html')))
        }
        catch(error){
            console.log('Error fetching the profile',error)
            res.status(500).send('Internal Server Error'); 
        }
    }
    static async home(req,res){
        try{
            res.status(200).sendFile((path.join(__dirname, '../views', 'home.html')))
        }
        catch(error){
            console.log('Error fetching the home',error)
            res.status(500).send('Internal Server Error'); 
        }
    }
    static async showFormSignIn(req, res){
        try{
            await res.status(200).sendFile(path.join(__dirname, '../views', 'sign-in.html'));
        }
        catch(error){
            console.log('Error fetching the form to sign in',error)
            res.status(500).send('Internal Server Error'); 
        }
    }
    static async showFormLogin(req,res){
        try{
            res.status(200).sendFile(path.join(__dirname, '../views', 'login.html'));
        }
        catch(error){
            console.log('Error fetching the form to authenticate',error)
            res.status(500).send('Internal Server Error'); 
        }
    }
    static async registerUser(req,res){
        try{
            const newUser= await UserModel.registerUser({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })
            res.status(201).sendFile(path.join(__dirname, '../views', 'sign-inOK.html'))
        }
        catch(error){
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(409).send('Username or email already exists');
            }
            else{
                console.error('Error creating user:', error);
                res.status(500).send('Internal Server Error'); 
            }
        }
    }
    static async logInUser(req,res){
        const { username, password } = req.body;
        try{
            const user = await UserModel.authenticate(username, password);  
            req.session.userId = user.id;
            req.session.isLogged = true;
            res.status(301).redirect('/user/profiles')
        }
        catch(error){
            console.error('Error during authenticate:',error.message)
            if (error.message === 'User not found'){
                res.status(404).send('User not found');
            }
            else if(error.message === 'Incorrect password'){
                res.status(401).send('Incorrect password');
            }
            else{
                res.status(500).send('Internal server error');
            }
        }
             
    }
    static async logOut(req, res){
        try{
            const isLogged= req.session.isLogged;
            if(!isLogged){
                return res.status(200).sendFile(path.join(__dirname, '../views', 'expired.html'))
            }
            req.session.destroy(error =>{
                if (error){
                    console.error('Error fetching logout', error)
                    return res.status(500).send('Error loggin out')
                }
                res.clearCookie('connect.sid');
                res.status(301).redirect('/user/home');
            });
        }
        catch(error){
            console.log(error)
            res.status(500).send('Internal server error');
        }
    }
    static async deleteUser(req, res){
        try{
            const id = (req.params.id);
            const result= await UserModel.deleteUser({ id });
            if (result == false){
                return res.status(404).sendFile((path.join(__dirname, '../views', '404notfound.html')))
            }
            return res.status(204).send('User deleted')
        }
        catch(error){
            console.log('Error fetching delete method:',error);
            res.status(500).send({ error: 'Failed to delete user' });
        }
    }
    static async updateUser(req,res){
        try{
            const { id }= req.params;
            const {username,password,email}= req.body;
            await UserModel.updateUser({id, newData: {username, password, email }});
            res.status(200).send('user updated')
        }
        catch(error){
            console.log('Error fetching update method:', error);
            res.status(500).send({ error: 'Failed to update user' });
        }
    }     
}
module.exports= UserController;






