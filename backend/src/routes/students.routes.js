import { Router } from 'express';
import { getAllStudents } from '../controllers/students.controllers.js';


const router = Router();


router.get("/estudiantes", getAllStudents);

export default router;