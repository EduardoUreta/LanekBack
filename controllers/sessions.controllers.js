import * as db from "../models/index.cjs"
import { verifyPassword, CreateSignature } from "../utils/index.js";

const { Usuarios } = db.default;

export class SessionsController {

    static login = async(req, res, next) => {
        const { email, password } = req.body;
        try {
            const usuario = await Usuarios.findOne({where: { email: email }});
            if(!usuario) throw new Error("Credenciales Inválidas", { cause: "INVALID_CREDENTIALS" });

            const validPassword = await verifyPassword(password, usuario.password);
            if(!validPassword) throw new Error("Credenciales Inválidas", { cause: "INVALID_CREDENTIALS" });

            const signature = CreateSignature({
                _id: usuario.id,
                email: usuario.email,
                rol: usuario.rol,
            });

            return res.cookie('Bearer', signature, {
                // httpOnly: true,     // Evita acceso desde JavaScript en el frontend
                secure: true,       // Requiere HTTPS
                sameSite: 'None',   // Permite el uso en dominios distintos
                path: '/',          // Aplica la cookie a toda la aplicación
            }).json({
                message: "Usuario logueado",
                token: signature
            });
            
        } catch (error) {
            next(error);
        };
    };

    static logout = async(req, res, next) => {
        if (req.user) {
            res.clearCookie('Bearer', {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                path: '/',
            });
            return res.json({ message: "Sesión Cerrada" });
        }
        return res.json({message: "No estás logueado para cerrar sesión"})
    };

};