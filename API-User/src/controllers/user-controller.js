const path= require('path')
const UserModel= require('../models/user-model.js');


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
    static async showFormSignIn(req, res){
        await res.sendFile(path.join(__dirname, '../views', 'sign-in.html'));
    }
    static async registerUser(req,res){
        try{
            const newUser= await UserModel.registerUser(req.body);
            res.sendFile((path.join(__dirname, '../views', 'sign-inOK.html')))
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'Failed to create the new user' });
        }
    }
    static async LogIn(req,res){
        
        //To do
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






