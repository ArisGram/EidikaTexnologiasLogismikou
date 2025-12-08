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

  async updateProduct(id, data) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new Error("Το προϊόν δεν βρέθηκε");
    return await product.update(data);
  }
  
  async getProductById(id) {
    return await this.productModel.findByPk(id);
  }
}

 
export default ProductService;

