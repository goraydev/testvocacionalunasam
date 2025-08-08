import { Router } from "express";
import {
  changePassword,
  getTestSessionByIdUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/resultados/usuario/:id", getTestSessionByIdUser);
router.put("/cambiar-password/:id", changePassword);

export default router;
