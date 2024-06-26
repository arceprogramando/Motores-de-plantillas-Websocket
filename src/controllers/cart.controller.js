import CartService from '../services/cart.services.js';

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  getAllCarts = async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await this.cartService.getAllCarts();

      if (limit) return res.status(200).json(products.slice(0, limit));

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getCartsById = async (req, res) => {
    try {
      const { cId } = req.params;
      const cart = await this.cartService.getCartsById(cId);
      if (!cart) return res.status(404).json({ error: 'La Busqueda del id de la cart no existe' });
      return res.json(cart);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener la cart' });
    }
  };

  createCart = async (req, res) => {
    try {
      const products = req.body;

      if (!Array.isArray(products)) return res.status(400).json({ error: 'La lista de productos debe ser un array' });

      const newCartId = await this.cartService.generateCartId();

      const newCart = {
        id: newCartId,
        products,
      };

      const createdCart = await this.cartService.createCart(newCart);

      return res.status(201).json({ status: 'success', cart: createdCart });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el carrito' });
    }
  };

  addQuantityProductInCart = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const { quantity } = req.body;

      const updatedCart = await this.cartService.addQuantityProductInCart(cId, pId, quantity);

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: `Error al actualizar el carrito ${error.message}` });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const cart = await this.cartService.getCartsById(cId);

      if (!cart) return res.status(404).json({ error: 'La cart no existe' });

      await this.cartService.deleteCart(cId);
      return res.json({ status: 'success', message: `La cart con id ${cId} sido eliminada` });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar la cart ' });
    }
  };
}

export default CartController;
