import { Router } from 'express';
import multer from 'multer'
import path from 'path';
import __dirname from '../../utils.js';

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/public/upload`);
  },

  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|PNG/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb('Error al archivo no es una imagen');
  },
}).single('image');

router.post('/', uploadMiddleware, (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }
  res.status(400);
});

export default router;
