// src/controllers/autenticacion_controller.js
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Generar token con expiracion de 1 dia
const generarToken = (Usuario) => {
    return jwt.sign({ id: Usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registro = async (req, res) => {
    try {
        const { nombre, correo, contrasenia } = req.body;
        const usuarioExistente = await Usuario.findOne({ corrreo });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo ya esta registrado" });
        } else {
            const nuevoUsuario = new Usuario({ nombre, correo, contrasenia });
            await nuevoUsuario.save();

            res.status(201).json({ message: "Usuario creado" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error al registrar el usuario - ${error}` })
    }
};

export const login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const usuario = await Usuario.finOne({ correo });
        if (!usuario) {
            return res.status(400).json({ message: "El correo no esta registrado" });
        }
        const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            return res.status(400).json({ message: "Credenciales no validas" });
        }
        const token = generarToken(usuario);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: `Error al iniciar sesión - ${error}` });
    }
}