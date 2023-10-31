const { Resend } = require("resend");
const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { generateToken, refreshToken } = require("../utils/jwt");
const { getMaxListeners } = require("../app");
const resend = new Resend("re_TcRmfkCs_9hSjAyifjNppWeNRiVrkg89X");

const signin = async (req, res) => {
    const { firstname, lastname, email, password, repeatPassword } = req.body;
    console.log(req.body);
    try {
        if (!email) {
            res.status(400).json({ message: "El email es requerido" });
            throw new Error("El email es requerido");
        }
        if (!password || !repeatPassword) {
            res.status(400).json({ message: "La contraseña es requerida" });
            throw new Error("La contrasña es requerida");
        }
        if (password !== repeatPassword) {
            res.status(400).json({ message: "Las contraseñas no coinciden" });
            throw new Error("Las contraseñas no coinciden");
        }
        const emailLowerCase = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const current_password_hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstname,
            lastname,
            email: emailLowerCase,
            password: current_password_hash,
            repeatPassword: current_password_hash,
        });
        const userStorage = await newUser.save();
        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [emailLowerCase],
            subject: "Ingresa al link para activar tu cuenta",
            html: `<strong>Activa tu cuenta mediante el siguiente link: </strong>
            <a href="http://localhost:3100/api/v1/user/activate/${userStorage._id}">Activar cuenta</a>`,
        });
        console.log(data)
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
            if (!userStore.active) {
                throw new Error("El usuario no esta verificado")
            }
            const check = await bcrypt.compare(
                password,
                userStore.password
            );
            if (!check) {
                throw new Error("La contraseña no es correcta");
            }
            const token = await generateToken(userStore);
            res.status(200).json({ token, message: "Login correcto", alert: "success" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
};

const getMe = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findById(id);

        res.status(200).json(userFind);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const activate = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findById(id);

        userFind.status = true;
        userStore = await userFind.save();

        res.redirect(301, 'http://localhost:3000/login');

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    signin,
    login,
    getMe,
    activate,
};