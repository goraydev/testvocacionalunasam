import jwt from "jsonwebtoken";
import { SECRET_JWT_SEED } from "../config.js";
export const validateJWT = (req, res, next) => {

    //x-token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ message: "No hay token en la petición" })
    }

    try {

        const { id, username, rol } = jwt.verify(token, SECRET_JWT_SEED);


        req.id = id;
        req.username = username;
        req.rol = rol;


    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token no válido" })
    }

    next();

}