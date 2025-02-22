// src/config/db.js
import mongoose from "mongoose";
// Función para conectar a MongoDB
const connectDB = async () => {
    try {
        // Intentar conectar a MongoDB usando la cadena de conexión de las variables de entorno
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado");
    } catch (error) {
        // Registrar un mensaje de error si la conexión falla
        console.log("Error al conectar a MongoDB" + error);
        // Salir del proceso con fallo
        process.exit(1);
    }
};

export default connectDB;