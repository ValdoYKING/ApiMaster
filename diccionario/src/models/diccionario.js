// src/models/diccionario.js
import { Schema, model } from 'mongoose';

const diccionarioSchema = new Schema({
    palabra: { type: String, required: true },
    definicion: { type: String, required: true }
}, { timestamps: true });

const Diccionario = model("Diccionario", diccionarioSchema);
export default Diccionario;