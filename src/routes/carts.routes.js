import { Router } from 'express';
import CartManager from '../CartManager.js';
import CartController from '../controllers/cart.controller.js';

const cartManager = new CartManager('./src/files/carts.json');

const cartController = new CartController();
const router = Router();

router.get('/', cartController.getAllCarts);

router.get('/:cId', cartController.getCartsById);

router.post('/', cartController.createCart);

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    const updatedCart = await cartManager.updateCart(cartId, productId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'La cart no existe' });
    }

    await cartManager.deleteCart(cid);
    return res.status(200).json({ status: 'success', message: 'La cart ha sido eliminada' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la cart' });
  }
});

export default router;
