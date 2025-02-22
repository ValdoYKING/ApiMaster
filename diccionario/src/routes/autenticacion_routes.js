// src/routes/autenticacion_routes.js
import express from "express";
import {login, registro} from "../controllers/autenticacion_controller.js";

const router = express.Router();
router.post("/registro", registro);
router.post("/login", login);

export default router;