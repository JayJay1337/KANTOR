const User = require('../model/userModel')
const userService = require("../services/userService");
const jwt = require("jsonwebtoken")

async function getAllUsersController(req, res){
    try {
        const users = await userService.displayMultipleUsers();
        res.json(users);
    }catch(err){
        res.status(400).json({message: "Błąd pobierania użytkowników"})
    }
}
async function getUserController(req, res){
    try {
        const user = await userService.displaySingleUser(req.params.id)
        res.json(user)
    }catch (err){
        res.status(400).json({message: err.message})
    }
}

async function createUserController(req, res) {
    try {
        await userService.addUser(req.body);
        res.status(201).json({message: "User created"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}
async function deleteUserController(req,res){
    try {
        await userService.removeUser(req.params.id)
        res.json({message: "User deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
async function updateUserController(req,res){
    try {
        await userService.editUser(req.body)
        res.json({message: "User updated"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

async function registerUserController(req, res) {
    try {
        await userService.addUser(req.body);
        res.status(201).json({ message: "Użytkownik został zarejestrowany" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function loginUserController(req, res){
    try{
        const { Email, Haslo } = req.body;
        const user = await userService.loginUser(Email, Haslo)
        const token =jwt.sign(
        {id: user.ID, imie: user.Imie},
             "klucz",
            {expiresIn: "1h" }
        )
        res.status(201).json({
            message: "Pomyślnie zalogowano",
            token,
        })
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
async function userPaginationController(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize)
        const data = await userService.getUsersPagination(page, pageSize);

        res.json(data);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
}


module.exports = { getAllUsersController, getUserController, deleteUserController, createUserController , updateUserController, registerUserController, loginUserController,userPaginationController}