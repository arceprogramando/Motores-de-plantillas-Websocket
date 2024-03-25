import CartDao from '../dao/cart.dao.js';

const filePath = './src/files/carts.json';

class CartService {
  constructor() {
    this.cartDao = new CartDao(filePath);
  }

  getAllCarts = async () => {
    try {
      const getAllCarts = await this.cartDao.getAllCarts();
      return getAllCarts;
    } catch (error) {
      throw new Error(`Error al buscar las carts en el service: ${error.message}`);
    }
  };

  getCartsById = async (cId) => {
    try {
      const getCartsById = await this.cartDao.getCartsById(cId);
      return getCartsById;
    } catch (error) {
      throw new Error(`Error al buscar las carts con id ${cId} en el service: ${error.message}`);
    }
  };
}

export default CartService;
