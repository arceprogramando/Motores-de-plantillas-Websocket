import fs from 'fs/promises';

class ProductDao {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos ');
    }
  }

  async generateProductId() {
    try {
      const products = await this.getAllProducts();
      const nextProductId = products.length > 0 ? products.length + 1 : 1;
      return nextProductId;
    } catch (error) {
      throw new Error('Error al generar el id del producto');
    }
  }

  async createProduct(product) {
    try {
      const nextProductId = await this.generateProductId();
      const products = await this.getAllProducts();
      const updatedProduct = { id: nextProductId, ...product };
      const createProduct = [...products, updatedProduct];

      await fs.writeFile(this.filePath, JSON.stringify(createProduct, null, '\t'));

      return createProduct;
    } catch (error) {
      throw new Error('Error al escribir el producto');
    }
  }

  async getProductsById(pId) {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === Number(pId));
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }
}

export default ProductDao;
