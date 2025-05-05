import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

const avatarDirectory = path.resolve('./public/assets/animales');

if (!fs.existsSync(avatarDirectory)) {
  fs.mkdirSync(avatarDirectory, { recursive: true });
}
// Configuración guardado de imágenes
const imagenStorage = multer.diskStorage({
    // Donde guardar img
    destination: function(req, file, callback){
        callback(null, avatarDirectory);
    },
    // Nombre de las imagenes
    filename: function(req, file, callback){
        callback(null, `${uuidv4()}-${file.originalname}`)
    }
});

// Filtro
export const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, png, gif)'), false); 
    }
  };
  

// Uploader de imágenes
export const uploadImagen = multer({
    storage: imagenStorage, 
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});