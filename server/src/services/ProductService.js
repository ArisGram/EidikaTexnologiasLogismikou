class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async createProduct(data) {
    return await this.productModel.create(data);
  }

  async getAllProducts() {
    return await this.productModel.findAll();
  }
}

export default ProductService;