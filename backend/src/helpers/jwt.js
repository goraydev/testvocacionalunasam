import jwt from "jsonwebtoken";
import { SECRET_JWT_SEED } from "../config.js";

export const generarJWT = async (id, username, rol) => {

    const payload = { id, username, rol };

    try {
        const token = jwt.sign(payload, SECRET_JWT_SEED, {
            expiresIn: '2h',
        });
        return token;
    } catch (err) {
        console.log(err);
        return 'No se pudo generar el token';
    }
};