import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { AnimalesRoutes, UsuariosRoutes } from "./routes/index.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// CORS
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true, 
}));

app.use('/api/animales', AnimalesRoutes);
app.use('/api/usuarios', UsuariosRoutes);

// app.use("/*", (req, res) => {
//     res.sendFile(path.join(process.cwd(),"public/index.html"));
// });

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});