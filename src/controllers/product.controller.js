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

  createProduct = async (req, res) => {
    try {
      const { title, description, code, price, status, stock, category } = req.body;

      let thumbnails = null;

      if (req.file) thumbnails = `/upload/${req.file.filename}`;

      if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

      if (!description) return res.status(400).json({ error: 'La descripción es obligatoria' });

      if (!code) return res.status(400).json({ error: 'El código es obligatorio' });

      if (!price) return res.status(400).json({ error: 'El precio es obligatorio' });

      if (!stock) return res.status(400).json({ error: 'El stock es obligatorio' });

      if (!category) return res.status(400).json({ error: 'La categoría es obligatoria' });

      if (!thumbnails) return res.status(400).json({ error: 'El thumbnails es obligatorio' });

      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      const createdProduct = await this.productService.createProduct(product);

      return res.status(201).json({ status: 'success', product: createdProduct });
    } catch (error) {
      return res.status(500).json({ error: `Error al crear el producto ${error}` });
    }
  };

  getProductsById = async (req, res) => {
    try {
      const { pId } = req.params;
      const product = await this.productService.getProductsById(pId);

      if (!product) res.status(404).json({ error: 'El producto no existe' });

      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
    }
  };
}

export default ProductController;
