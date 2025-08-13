import { Router } from "express";
import {
  changeEmail,
  changePassword,
  changeUserName,
  getTestSessionByIdUser,
  recoverPassword,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/resultados/usuario/:id", getTestSessionByIdUser);
router.put("/cambiar-password/:id", changePassword);
router.put("/email/:id", changeEmail);
router.put("/cambiar-username/:id", changeUserName);

export default router;
