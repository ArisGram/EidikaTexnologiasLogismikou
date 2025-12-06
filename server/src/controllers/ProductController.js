class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  create = async (req, res) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

export default ProductController;