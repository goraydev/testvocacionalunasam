import { Router } from "express";
import { check } from "express-validator";
import {
  logIn,
  recoverPassword,
  renewToken,
} from "../controllers/users.controllers.js";
import { validateFields } from "../middlewares/fields-validator.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

//Inicio de sesión y token
router.post(
  "/login",
  [
    //middlewares
    check("username", "USERNAME no debe ser vacio").not().isEmpty(),
    check("password", "PASSWORD no debe ser vacio").not().isEmpty(),
    validateFields,
  ],
  logIn
);

router.get("/renew", validateJWT, renewToken);
router.post("/recuperar-password", recoverPassword);

export default router;
