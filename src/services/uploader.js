import multer from 'multer';
import { join } from 'path';
import __dirname from '../utils.js';

const uploadPath = join(__dirname, 'public', 'upload');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    console.log('Destination:', uploadPath);
    cb(null, uploadPath);
  },
  filename(_req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/i;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname);

    if (!mimetype) {
      return cb(new Error(`Tipo de archivo no permitido. Solo se permiten: ${filetypes}`));
    }

    if (!extname) {
      return cb(new Error(`Extensión de archivo no permitida. Solo se permiten: ${filetypes}`));
    }

    if (file.size > 2000000) {
      return cb(new Error('El archivo excede el tamaño máximo permitido de 2MB'));
    }

    return cb(null, true);
  },
}).single('image');

export default uploadMiddleware;
