import { Router } from "express";
import { UsuariosControllers } from "../controllers/index.js";

export const UsuariosRoutes = Router();

UsuariosRoutes.get('/', UsuariosControllers.obtenerUsuarios);
UsuariosRoutes.get('/:id', UsuariosControllers.obtenerUsuarioPorId);
UsuariosRoutes.post('/', UsuariosControllers.crearUsuario);
UsuariosRoutes.put('/:id', UsuariosControllers.actualizarUsuario);
UsuariosRoutes.delete('/:id', UsuariosControllers.eliminarUsuario);