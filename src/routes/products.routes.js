/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager('./src/files/products.json');

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

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    // eslint-disable-next-line no-console
    // console.log(products);
    const PORT = 8080;
    res.render('home', {
      products,
      style: 'index.css',
      port: PORT,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

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

// eslint-disable-next-line consistent-return
router.put('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (
      !title &&
      !description &&
      !code &&
      !price &&
      !stock &&
      !category &&
      !thumbnails
    ) {
      return res.status(400).json({
        error: 'Se debe proporcionar al menos un campo para actualizar',
      });
    }

    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    const updatedProductData = {
      title: title || product.title,
      description: description || product.description,
      code: code || product.code,
      price: price || product.price,
      stock: stock || product.stock,
      category: category || product.category,
      thumbnails: thumbnails || product.thumbnails,
    };

    const updatedProduct = await productManager.updateProduct(
      pid,
      updatedProductData,
    );
    res.status(200).json({ status: 'success', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

export default router;
