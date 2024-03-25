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
}

export default CartController;
