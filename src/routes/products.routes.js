import { Router } from 'express';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/product.controller.js';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/:pId', productController.getProductsById);

router.put('/:pId', uploadMiddleware, productController.updateProduct);

router.delete('/:pId', productController.deleteProduct);

export default router;
