export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(limit, query, sort, page) {
    return await this.dao.getProducts(limit, query, sort, page)
  }

  async getProductById(pid) {
    return await this.dao.getProductById(pid)
  }

  async createProduct(product) {
    return await this.dao.createProduct(product)
  }

  async updateProduct(pid, updatedProduct) {
    return await this.dao.updateProduct(pid, updatedProduct)
  }

  async deleteProduct(pid) {
    return await this.dao.deleteProduct(pid)
  }


}
