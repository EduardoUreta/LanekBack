import * as db from "../models/index.cjs";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Animales } = db.default;

export class AnimalesControllers {

    static obtenerAnimales = async(req, res, next) => {
        try {
            const animales = await Animales.findAll();
            return res.status(200).json(animales);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerAnimalPorId = async(req, res, next) => {
        const usuarioId = req.params.id;
        try {
            const animal = await Animales.findOne({where: {UsuarioId: usuarioId}});
            if(!animal) return res.status(404).json({message: "Animales No Encontrado"});

            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearAnimal = async(req, res, next) => {
        const datos = req.body;

        let imagenURL = null;
        if (req.file) {
            imagenURL = `assets/animales/${req.file.filename}`;
        };

        const datosNuevos = {
            ...datos, 
            imagen_url: imagenURL 
        };

        try {
            if(!datosNuevos.animalFavorito) return res.status(400).json({message: "Datos Faltantes"});
            if(!datosNuevos.imagen_url) return res.status(400).json({message: "Datos Faltantes"});

            const nuevoAnimal = await Animales.create(datosNuevos);
            return res.status(201).json({message: "Animal Creado Correctamente"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarAnimal = async(req, res, next) => {
        const nuevosDatos = req.body;
        const id = req.params.id;
        try {
            const animal = await Animales.findByPk(id);  
            if (!animal) return res.status(404).json({ message: "Animal No Encontrado" });

            await Animales.update(nuevosDatos, { where: { id } });
            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarAnimal = async (req, res, next) => {
        const id = req.params.id;
    
        try {
            const animal = await Animales.findByPk(id);
            if (!animal) return res.status(404).json({ message: "Animal No Encontrado" });
    
            const rutaImagen = path.join(__dirname, '../public/', animal.imagen_url);
    
            fs.unlink(rutaImagen, (err) => {
                if (err) {
                    console.error("Error eliminando la imagen: ", err);
                } else {
                    console.log("Imagen eliminada correctamente.");
                }
            });
    
            await Animales.destroy({ where: { id } });
    
            return res.status(200).json({ message: "Animal Eliminado" });
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    static descargarImagenAnimal = async(req, res, next) => {
        const { filename } = req.params;
        const rutaArchivo = path.join(__dirname, '../public/assets/animales', filename);

        res.download(rutaArchivo, (err) => {
            if (err) {
                console.error('Error al descargar:', err);
                res.status(404).send('Archivo no encontrado');
            }
        });
    };

};