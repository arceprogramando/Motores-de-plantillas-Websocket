import ProductService from '../services/product.services.js';

class ViewController {
  constructor() {
    this.productService = new ProductService();
  }

  viewIndex = async (_req, res) => {
    try {
      const findproducts = await this.productService.getAllProducts();
      console.log('🚀 ~ ViewController ~ viewIndex= ~ findproducts:', findproducts);
      const products = findproducts.map((product) => product);
      console.log('🚀 ~ ViewController ~ viewIndex= ~ products:', products);
      res.render('home', {
        products,
        style: 'index.css',
        port: 8080,
      });
    } catch (error) {
      throw new Error(`Error al visualizar el index en el service: ${error.message}`);
    }
  };
}
export default ViewController;
