import { Router } from "express";
import { AnimalesControllers } from "../controllers/index.js";
import { uploadImagen } from "../utils/multer.js";

export const AnimalesRoutes = Router();

AnimalesRoutes.get('/', AnimalesControllers.obtenerAnimales);
AnimalesRoutes.get('/:id', AnimalesControllers.obtenerAnimalPorId);
AnimalesRoutes.post('/', uploadImagen.single('imagen_url'), AnimalesControllers.crearAnimal);
AnimalesRoutes.put('/:id', uploadImagen.single('imagen_url'), AnimalesControllers.actualizarAnimal);
AnimalesRoutes.delete('/:id', AnimalesControllers.eliminarAnimal);
AnimalesRoutes.get('/descargar/:filename', AnimalesControllers.descargarImagenAnimal);