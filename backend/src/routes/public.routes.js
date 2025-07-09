import { Router } from "express";
import { getAllQuestions } from "../controllers/questions.controllers.js";
import { getAllScaleOptions } from "../controllers/scaleOptions.controllers.js";
import { getAreasBySection } from "../controllers/areas.controllers.js";

const router = Router();
router.get("/preguntas", getAllQuestions);
router.get("/escalas", getAllScaleOptions);
router.post("/areas", getAreasBySection);

export default router;