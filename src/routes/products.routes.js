import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/product.controller.js';

const router = Router();

const productManager = new ProductManager('./src/files/products.json');

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(pid);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

// Actulizacion Update

router.put('/api/products/:pid', uploadMiddleware, async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category } = req.body;

    let thumbnails = null;
    if (req.file) {
      thumbnails = `/src/public/upload/${req.file.filename}`;
    }

    if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

    if (!description) return res.status(400).json({ error: 'La descripción es obligatoria' });

    if (!code) return res.status(400).json({ error: 'El código es obligatorio' });

    if (!price) return res.status(400).json({ error: 'El precio es obligatorio' });

    if (!stock) return res.status(400).json({ error: 'El stock es obligatorio' });

    if (!category) return res.status(400).json({ error: 'La categoría es obligatoria' });

    if (!thumbnails) return res.status(400).json({ error: 'El thumbnails es obligatorio' });

    const updatedProduct = await productManager.updateProduct(pid, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    return res.status(200).json({ status: 'success', product: updatedProduct });
  } catch (error) {
    return res.status(500).json({ error: `Error al actualizar el producto ${error}` });
  }
});
// Eliminación Delete

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
