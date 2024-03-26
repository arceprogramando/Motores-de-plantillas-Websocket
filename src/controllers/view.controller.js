import ProductService from '../services/product.services.js';

class ViewController {
  constructor() {
    this.productService = new ProductService();
  }

  viewIndex = async (_req, res) => {
    try {
      const findproducts = await this.productService.getAllProducts();
      const products = findproducts.map((product) => product);
      res.render('home', {
        products,
        style: 'index.css',
        port: 8080,
      });
    } catch (error) {
      throw new Error(`Error al visualizar el index en el service: ${error.message}`);
    }
  };

  viewAddProduct = async (_req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.render('addProducts', {
        products,
        style: 'index.css',
      });
    } catch (error) {
      throw new Error(`Error al visualizar la pagina de creacion de producto en el service: ${error.message}`);
    }
  };
}

export default ViewController;
