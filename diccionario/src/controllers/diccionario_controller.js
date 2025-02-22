// src/controllers/diccionario_controller.js
import Diccionario from '../models/diccionario.js';
import { registrarLog } from '../middlewares/logMiddleware.js';

//Obtener la definicion de una palabra
export const obtenerDefinicion = async (req, res) => {
    try {
        const palabras = await Diccionario.find();
        res.json(palabras);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la definicion de la palabra - ${error}` });
    }
};

//Obtener una palabra por su id
export const obtenerPalabraPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const palabra = await Diccionario.findById(id);
        if (!palabra) {
            return res.status(404).json({ message: "Palabra no encontrada" });
        }
        res.json(palabra);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la palabra ${error}` });
    }
};

//Crear una nueva definicion
export const crearDefinicion = async (req, res) => {
    const { palabra, definicion } = req.body;
    const usuario = req.user.id;

    if (!palabra || !definicion) {
        return res.status(400).json({ message: "La palabra y la definicion son requeridos" });
    }

    const nuevaDefinicion = new Diccionario({ palabra, definicion });

    try {
        const definicionGuardada = await nuevaDefinicion.save();
        await registrarLog(usuario, "CREAR", "DEFINICION", definicionGuardada._id, definicionGuardada);
        res.status(201).json(definicionGuardada);
    } catch (error) {
        res.status(500).json({ message: `Error al crear la definicion - ${error}` });
    }
};

//Actualizar una definicion existente
export const actualizarDefinicion = async (req, res) => {
    const { id } = req.params;
    const { palabra, definicion } = req.body;
    const usuario = req.user.id;

    try {
        const definicionActualizada = await Diccionario.findByIdAndUpdate(id, { palabra, definicion }, { new: true });
        if (!definicionActualizada) {
            return res.status(404).json({ message: "Palabra no encontrada" });
        }
        await registrarLog(usuario, "ACRTUALIZAR", "DEFINICION", definicionActualizada._id, definicionActualizada);
        res.json(definicionActualizada);
    } catch (error) {
        resizeTo.status(500).json({ message: `Error al actualizar la definicion - ${error}` });
    }
};

//Eliminar una definicion existente por su ID
export const eliminarPalabra = async (req, res) => {
    const { id } = req.params;
    const usuario = req.user.id;

    try {
        const palabraEliminada = await Diccionario.findByIdAndDelete(id);
        if (!palabraEliminada) {
            return res.status(404).json({ message: "Palabra no econtrada" });
        }
        await registrarLog(usuario, "ELIMINAR", "DEFINICION", palabraEliminada._id, palabraEliminada);
        res.json(palabraEliminada);
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar la palabra - ${error}` });
    }
};