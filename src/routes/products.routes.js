import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/product.controller.js';

const router = Router();

const productManager = new ProductManager('./src/files/products.json');

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/:pId', productController.getProductsById);

router.put('/:pId', uploadMiddleware, productController.updateProduct);

router.delete('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(pid);

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    await productManager.deleteProduct(pid);

    return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: `error al eliminar el producto ${error}` });
  }
});

export default router;
