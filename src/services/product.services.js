import ProductDao from '../dao/product.dao.js';

const filePath = './src/files/products.json';

class ProductService {
  constructor() {
    this.productDao = new ProductDao(filePath);
  }

  getAllProducts = async () => {
    try {
      const findProducts = await this.productDao.getAllProducts();
      return findProducts;
    } catch (error) {
      throw new Error(`Error al buscar todos los productos en el service: ${error.message}`);
    }
  };

  createProduct = async (product) => {
    try {
      const createProduct = await this.productDao.createProduct(product);
      return createProduct;
    } catch (error) {
      throw new Error(`Error al crear el producto  en el service: ${error.message}`);
    }
  };

  getProductsById = async (pId) => {
    try {
      const getProductsById = await this.productDao.getProductsById(pId);
      return getProductsById;
    } catch (error) {
      throw new Error(`Error al buscar el producto con el id ${pId} en el service: ${error.message}`);
    }
  };

  updateProduct = async (pId, updatedProductData) => {
    try {
      const updateProduct = await this.productDao.updateProduct(pId, updatedProductData);
      return updateProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto con el id ${pId} en el service: ${error.message}`);
    }
  };
}

export default ProductService;
