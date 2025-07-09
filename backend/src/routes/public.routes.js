import { Router } from "express";
import { getAllQuestions } from "../controllers/questions.controllers.js";
import { getAllScaleOptions } from "../controllers/scaleOptions.controllers.js";

const router = Router();
router.get("/preguntas", getAllQuestions);
router.get("/escalas", getAllScaleOptions);

export default router;