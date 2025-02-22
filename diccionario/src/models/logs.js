// src/models/logs.js
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
    usuario: { type: String, required: true },
    accion: { type: String, required: true },
    entidad: { type: String, required: true },
    entidad_id: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Log = model("Log", logSchema);
export default Log;