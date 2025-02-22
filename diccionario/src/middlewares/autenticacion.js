// src/middlewares/autenticacion.js
import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const verificarToken = (req, res, next) => {
    // Obtener el encabezado de autorización
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        // Si no hay encabezado de autorización, devolver un error 403
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    // Extraer el token del encabezado de autorización
    const token = authHeader.split(" ")[1];
    if (!token) {
        // Si no hay token, devolver un error 403
        return res.status(403).json({ message: "Token no valido" });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adjuntar la información del usuario decodificado al objeto de solicitud
        req.user = decoded;
        // Pasar al siguiente middleware
        next();
    } catch (error) {
        // Si el token no es válido, devolver un error 401
        return res.status(401).json({ message: `Token invalido ${error}` });
    }
};