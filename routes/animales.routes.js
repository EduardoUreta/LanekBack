import { Router } from "express";
import { AnimalesControllers } from "../controllers/index.js";

export const AnimalesRoutes = Router();

AnimalesRoutes.get('/', AnimalesControllers.obtenerAnimales);
AnimalesRoutes.get('/:id', AnimalesControllers.obtenerAnimalPorId);
AnimalesRoutes.post('/', AnimalesControllers.crearAnimal);
AnimalesRoutes.put('/:id', AnimalesControllers.actualizarAnimal);
AnimalesRoutes.delete('/:id', AnimalesControllers.eliminarAnimal);