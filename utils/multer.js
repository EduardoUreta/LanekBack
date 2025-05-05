import multer from 'multer';

// Multer sin destino, usará memoria temporal
export const uploadImagen = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, png, gif)'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
