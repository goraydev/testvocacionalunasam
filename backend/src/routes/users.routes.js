import { Router } from "express";
import {
  changeEmail,
  changePassword,
  getTestSessionByIdUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/resultados/usuario/:id", getTestSessionByIdUser);
router.put("/cambiar-password/:id", changePassword);
router.put("/email/:id", changeEmail);

export default router;
