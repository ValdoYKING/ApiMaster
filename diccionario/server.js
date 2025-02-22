import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import diccionarioRoutes from "./src/routes/diccionario_routes.js";
import autenticacionRoutes from "./src/routes/autenticacion_routes.js";

const app = express();
app.use(express.json());

// Configuración de opciones de CORS
const corsOptions = {
    origin: function(origin, callback){
        // Lista de orígenes permitidos
        /* const allowedOrigins = ['http://localhost:3000', 'https://diccionario-cliente.herokuapp.com']; */
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
        // Verifica si el origen de la solicitud está en la lista de orígenes permitidos
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            // Si el origen está permitido, se llama al callback sin error
            callback(null, true);
        } else{
            // Si el origen no está permitido, se llama al callback con un error
            callback(new Error('No permitido por CORS'));
        }
    },
    // Métodos HTTP permitidos
    methods: "GET, POST, PUT, DELETE",
}

app.use(cors(corsOptions));

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