// src/routes/diccionario_routes.js
import express from "express";
import * as diccionarioController from "../controllers/diccionario_controller.js";
import { verificarToken } from "../middlewares/autenticacion.js";

const router = express.Router();

//Obtener todas las definiciones de palabras
router.get("/", verificarToken, diccionarioController.obtenerDefinicion);

//Obtener una palabra por su id
router.get("/:id", verificarToken, diccionarioController.obtenerPalabraPorId);

//Crear una nueva definicion
router.post("/", verificarToken, diccionarioController.crearDefinicion);

//Acualizar una definicion existente
router.put("/:id", verificarToken, diccionarioController.actualizarDefinicion);

//Eliminar una definicion
router.delete("/:id", verificarToken, diccionarioController.eliminarPalabra);

export default router;