import { Router } from 'express';
import { getTestSessionByIdUser } from '../controllers/users.controllers.js';


const router = Router();


router.get("/resultados/usuario/:id", getTestSessionByIdUser);

export default router;