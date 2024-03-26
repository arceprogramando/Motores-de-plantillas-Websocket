import ProductService from '../services/product.services.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await this.productService.getAllProducts();
      if (limit) return res.json({ products: products.slice(0, Number(limit)) });
      return res.json({ products });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };
}

export default ProductController;
