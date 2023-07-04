import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager('./src/files/products.json');

const router = Router();

router.get('/', async (req, res) => {
  const findproducts = await productManager.getProducts();
  const products = findproducts.map((product) => product);
  res.render('home', {
    products,
    style: 'index.css',
    port: 8080,
  });
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    // Aqui envio mis products
    res.render('realTimeProducts', {
      products,
      style: 'index.css',
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

export default router;
