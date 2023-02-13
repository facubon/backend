import { productModel } from '../dao/models/products.models.js'

class productDao {

  async getProducts(limit, query, sort, page) {
    if ((limit === 0 || !limit)) {
      return await productModel.paginate(query, {paginate:false, page:page || 1, sort: {price:sort || 0}})
    } else {
      return await productModel.paginate(query, {limit:limit || false, page:page || 1, sort: {price:sort || 0}})
    }
  } 


  async getProductById(id) {
      return productModel.findById(id)
  }


  async createProduct(product) {
    return await productModel.create(product)
  }

  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product, { new: true })
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id)
  }
}

export default new productDao();
