import { Router } from "express";
import { getAllQuestions } from "../controllers/questions.controllers.js";
import { getAllScaleOptions } from "../controllers/scaleOptions.controllers.js";
import { getAreasBySection } from "../controllers/areas.controllers.js";
import {
  createAccountUserStudent,
  recoverPassword,
  resetPassword,
} from "../controllers/users.controllers.js";

const router = Router();
router.get("/preguntas", getAllQuestions);
router.get("/escalas", getAllScaleOptions);
router.post("/areas", getAreasBySection);
router.post("/usuarios-estudiante", createAccountUserStudent);
router.post("/recuperar-password", recoverPassword);
router.post("/cambiar-password", resetPassword);

export default router;
