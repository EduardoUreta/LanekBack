import * as db from "../models/index.cjs";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import { uploadFileToS3 } from "../utils/uploadS3.js";
import AWS from 'aws-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Animales } = db.default;

const s3 = new AWS.S3();

const BUCKET_NAME = 'imglanek'; 
const REGION = 'us-east-1';

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
            // if(!animal) return res.status(404).json({message: "Animales No Encontrado"});
            if(!animal) return res.status(200).json(null);

            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };


    static crearAnimal = async (req, res, next) => {
        const datos = req.body;

        let imagenURL = null;

        // Subir imagen a S3 si viene un archivo
        if (req.file) {
            try {
                const result = await uploadFileToS3(req.file, 'imglanek');
                imagenURL = result.Location; 
            } catch (err) {
                console.error("Error al subir a S3:", err);
                return res.status(500).json({ message: "Error al subir la imagen." });
            }
        }

        const datosNuevos = {
            ...datos,
            imagen_url: imagenURL
        };

        try {
            if (!datosNuevos.animalFavorito || !datosNuevos.imagen_url) {
                return res.status(400).json({ message: "Datos faltantes" });
            }

            const nuevoAnimal = await Animales.create(datosNuevos);
            return res.status(201).json({ message: "Animal creado correctamente" });
        } catch (error) {
            console.error(error);
            next(error);
        }
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

        const params = {
            Bucket: BUCKET_NAME,
            Key: filename, // El nombre del archivo en S3
        };

        try {
                // Obtiene la imagen desde S3
                const data = await s3.getObject(params).promise();

                // Establecer el tipo de contenido correcto según la extensión del archivo
                res.setHeader('Content-Type', data.ContentType);
                res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

                // Enviar la imagen como respuesta
                res.send(data.Body);
            } catch (err) {
                console.error('Error al descargar desde S3:', err);
                res.status(404).send('Archivo no encontrado');
            }
    };

};