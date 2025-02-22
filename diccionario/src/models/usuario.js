// src/models/usuario.js
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt.js';

/* Creacion del esquema de usuario para la base de datos */
const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true },
    rol: { type: String, required: true, default: "user" },
    edad: { type: Number, required: false },
}, { timestamps: true });

//Encriptacion de contraseña de usuario antes de mandar a la base de datos
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("contrasenia")) return next();
    const salt = await bcrypt.genSalt(10);
    this.contrasenia = await bcrypt.hash(this.contrasenia, salt);
    next();
});

const Usuario = model("usuario", usuarioSchema);
export default Usuario;