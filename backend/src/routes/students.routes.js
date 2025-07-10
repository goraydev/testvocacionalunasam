import { Router } from 'express';
import { getAllStudents, getStudentCompleteData, } from '../controllers/students.controllers.js';


const router = Router();


router.get("/estudiantes", getAllStudents);
router.get("/estudiantes/:id/reporte", getStudentCompleteData);

export default router;