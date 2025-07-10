import jwt from 'jsonwebtoken';
import { SECRET_JWT_SEED } from '../config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Se requiere un token para autenticación' });
    }

    try {
        const { id, username, rol } = jwt.verify(token, SECRET_JWT_SEED);


        req.user = { id, username, rol }

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};


// Middleware para verificar roles específicos
export const checkRole = (roles) => {

    return (req, res, next) => {


        if (!req.user) {
            return res.status(403).json({ message: 'Se requiere autenticación' });
        }

        console.log(req.user);
        if (roles.includes(req.user.rol)) {
            next();
        } else {
            return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
        }
    };
};