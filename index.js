import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { AnimalesRoutes, SessionsRoutes, UsuariosRoutes } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5090;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true,  limit: '5mb'}));

// CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://eduardoureta.xyz', 'http://eduardoureta.xyz', 'http://demo.lanekapp.com:5090/'],
    credentials: true, 
}));

app.use('/api/animales', AnimalesRoutes);
app.use('/api/usuarios', UsuariosRoutes);
app.use('/api/auth', SessionsRoutes);

app.use("/*path", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/index.html"));
});

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});


