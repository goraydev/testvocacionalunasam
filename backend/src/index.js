import express from "express";
import { PETITION_API_DEV, PETITION_API_PROD, PORT } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import userRoutes from "./routes/users.routes.js";
import studentsRoutes from "./routes/students.routes.js"

import morgan from "morgan";
import cors from "cors";
import { checkRole, verifyToken } from "./middlewares/auth.middleware.js";

const app = express();

const whiteList = [PETITION_API_DEV, PETITION_API_PROD]

const lists = function (origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
}
const corsOption = {
    origin: lists,
    methods: "GET,HEAD,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
}


app.use(cors(corsOption));
app.use(morgan('dev'))
app.use(express.json());


//rutas publicas
app.use('/api', [authRoutes, publicRoutes]);

//rutas privadas
app.use('/api', verifyToken, checkRole(['administrador', 'estudiante']), userRoutes);
app.use('/api', verifyToken, checkRole(['administrador']), [studentsRoutes]);

app.listen(PORT);
console.log(`servidor escuchando en el puerto ${PORT}`);