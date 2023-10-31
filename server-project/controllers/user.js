const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { generateToken, refreshToken } = require("../utils/jwt");

//Crear la funcion para el registro -signIn
const signin = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        if (!email) {
            res.status(400).json({ message: "El email es requerido" });
            throw new Error("El email es requerido");
        }
        if (!password) {
            res.status(400).json({ message: "La contraseña es requerida" });
            throw new Error("La contrasña es requerida");
        }
        const emailLowerCase = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const current_password_hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstname,
            lastname,
            email: emailLowerCase,
            password: current_password_hash,
        });

        const userStorage = await newUser.save();

        res.status(201).json(newUser);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("El email y la contraseña son obligatorios");
        }
        const emailLowerCase = email.toLowerCase();
        const userStore = await User.findOne({ email: emailLowerCase }).exec();
        if (!userStore) {
            throw new Error("El usuario no existe");
        }
        const check = await bcrypt.compare(
            password,
            userStore.password
        );
        if (!check) {
            throw new Error("La contraseña no es correcta");
        }
        const token = await generateToken(userStore);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getMe = async(req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findById(id);
        //Obtener token del usuario 
        
        res.status(200).json(userFind);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = {
    signin,
    login,
    getMe,
};