import fs from 'fs/promises';

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error al obtener las carts');
    }
  }

  async getCartsById(cId) {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const carts = JSON.parse(data);
      const cart = carts.find((c) => c.id === Number(cId));
      return cart;
    } catch (error) {
      throw new Error('Error al obtener la Cart');
    }
  }

  async generateCartId() {
    try {
      const carts = await this.getAllCarts();
      const NextCartId = carts.length > 0 ? carts.length + 1 : 1;
      return NextCartId;
    } catch (error) {
      throw new Error('Error al generar el ID del producto');
    }
  }

  async createCart(cart) {
    try {
      const NextCartId = await this.generateCartId();
      const carts = await this.getAllCarts();

      const updatedCart = {
        id: NextCartId,
        ...cart,
      };
      const updatedCarts = [...carts, updatedCart];

      await fs.writeFile(this.filePath, JSON.stringify(updatedCarts, null, '\t'));

      return updatedCart;
    } catch (error) {
      return error.message;
    }
  }

  async addQuantityProductInCart(cId, pId, quantity) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id === Number(cId));

      if (!cart) throw new Error('Carrito no encontrado');

      const existingProduct = cart.products.find((p) => p.product === pId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pId, quantity });
      }

      await fs.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));

      return cart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  async deleteCart(cId) {
    try {
      const carts = await this.getCarts();
      const index = carts.findIndex((c) => c.id === parseInt(cId, 10));

      if (index === -1) {
        throw new Error('El id de la Cart no  existe');
      }

      carts.splice(index, 1);

      await fs.writeFile(this.filepath, JSON.stringify(carts, null, '\t'));
    } catch (error) {
      throw new Error('Error al eliminar la cart');
    }
  }
}

export default CartManager;
