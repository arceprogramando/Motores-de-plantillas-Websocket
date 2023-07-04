// CRUD products Routes
import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import uploadMiddleware from '../services/uploader.js';

const router = Router();

const productManager = new ProductManager('./src/files/products.json');

// Creacion Create

router.post('/api/products', uploadMiddleware, async (req, res) => {
  try {
    const {
      title, description, code, price, status, stock, category,
    } = req.body;

    let thumbnails = null;
    if (req.file) {
      thumbnails = `/upload/${req.file.filename}`;
    }

    if (!title
      || !description
      || !code
      || !price
      || !status
      || !stock
      || !category
      || !thumbnails) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }

    const product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const createdProduct = await productManager.writeProduct(product);

    return res.status(201).json({ status: 'success', product: createdProduct });
  } catch (error) {
    return res.status(500).json({ error: `Error al crear el producto ${error}` });
  }
});

// Lectura Read

router.get('/api/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

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
    res
      .status(500)
      .json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

// Actulizacion Update

router.put('/api/products/:pid', uploadMiddleware, async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title, description, code, price, status, stock, category,
    } = req.body;

    let thumbnails = null;
    if (req.file) {
      thumbnails = `/src/public/upload/${req.file.filename}`;
    }

    if (
      !title
      || !description
      || !code
      || !price
      || !status
      || !stock
      || !category
      || !thumbnails
    ) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }

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
