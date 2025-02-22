import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import diccionarioRoutes from "./src/routes/diccionario_routes.js";
import autenticacionRoutes from "./src/routes/autenticacion_routes.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/diccionario", diccionarioRoutes);
app.use("/api/autenticacion", autenticacionRoutes);

app.get("/", (req, res) => {
    res.send("API de diccionario");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecucion desde el puerto ${PORT}`);
});