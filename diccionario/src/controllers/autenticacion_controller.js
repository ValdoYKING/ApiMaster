// src/controllers/autenticacion_controller.js
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Generar token con expiracion de 1 dia
// Función para generar un token JWT con una duración de 1 día
const generarToken = (Usuario) => {
    return jwt.sign({ id: Usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Controlador para el registro de usuarios
export const registro = async (req, res) => {
    try {
        const { nombre, correo, contrasenia } = req.body;
        
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        } else {
            // Crear un nuevo usuario y guardarlo en la base de datos
            const nuevoUsuario = new Usuario({ nombre, correo, contrasenia });
            await nuevoUsuario.save();

            res.status(201).json({ message: "Usuario creado" });
        }
    } catch (error) {
        res.status(500).json({ message: `Error al registrar el usuario - ${error}` });
    }
};

// Controlador para el inicio de sesión de usuarios
export const login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        
        // Buscar el usuario por correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ message: "El correo no está registrado" });
        }
        
        // Verificar si la contraseña es válida
        const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            return res.status(400).json({ message: "Credenciales no válidas" });
        }
        
        // Generar un token JWT y enviarlo en la respuesta
        const token = generarToken(usuario);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: `Error al iniciar sesión - ${error}` });
    }
};