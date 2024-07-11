const express = require('express')
const {Sequelize, UUIDV4, QueryTypes, DataTypes, Model } = require('sequelize')
const sequelize= require('../config/sqlconfig')
const bcrypt= require('bcrypt')

class UserModel extends Sequelize.Model {
    static async getAll(){
        try{
            const users= await UserModel.findAll();
            return users;
        }
        catch(error){
            console.error('Error getting all users', error);
            throw new Error('Error getting all users');
        }
    }
    static async getById({ id }){
        try{
            if (!id) {
                throw new Error('ID is required');
            }
            const user = await UserModel.findByPk(id);
            return user;
        }
        catch(error){
            console.error('Error getting by ID', error)
            throw new Error('Error getting user by ID');
        }
    }
    static async getByUsername(username){
        try{
            if (!username){
            throw new Error('Username is required');}

            const user= await UserModel.findOne(
                { where: {username}}
            )
            return user;
        }
        catch(error){
            console.error('Error getting by username', error); 
            throw new Error('Error getting user by username');
        }
    }
    static async getByEmail(email){
        try{
            if (!email){
                throw new Error('Email is required', Error);
            }
            const user = await UserModel.findOne({ where: { email } });
            return user;
        }
        catch(error){
            console.error('Error getting by email', error)
            throw new Error('Error getting user by email');
        }
    }
    static async registerUser({username, password, email}){
        if (!username || !password || !email) {
            throw new Error('Missing required user fields')
        };
        const existingUser= await this.getByUsername(username);
        const existingEmail= await this.getByEmail(email);
        if (existingUser){
            return{
            success: false, message:'Username already exists'};
        }  
        if (existingEmail)
            return {
            susccess: false, message:'Username already exists'
        };
        try{
            const hashedPassword= await bcrypt.hash(password,10);
            const user= await UserModel.create({ username, password: hashedPassword, email})
            console.log(hashedPassword)
            return { success: true, user };
        }
        catch(err){
            console.error('Error in create method:', err);
            throw new Error('Error creating user');
            }
    }
    static async authenticate(username, password){
        const user= await this.getByUsername(username);
        if (!user){
            throw new Error ('User not found')
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            throw new Error ('Incorrect password')
        }
        return user;
    }
    static async deleteUser( { id }){
        try{
            if (!id){
                throw new Error ('ID is required')
            }
            const user = await UserModel.findByPk(id);
            if (!user){
                throw new Error('User not found');
            }
            await user.destroy();
            return true;
        }
        catch(error){
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
        }
    }
    static async updateUser({ id, newData }){
        try{
            if (!id){
                throw new Error ('ID is required')
            }
            if (!newData){
                throw new Error('New Data is required');
            }

            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            if (newData.password) {
                const hashedPassword = await bcrypt.hash(newData.password, 10);
                newData.password = hashedPassword;
            }
            await user.update({
                username: newData.username,
                email: newData.email,
                password: newData.password
            });
            return true;
        }
        catch(error){
            console.error('Error updating user', error);
            throw new Error('Error updating user');
        }
    }
}

UserModel.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'UserModel', 
    tableName: 'users', 
    timestamps: false
});

module.exports = UserModel;
