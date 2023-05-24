import { productModel } from '../models/products.models.js'

class productDao {

  async getProducts(limit, query, sort, page) {
    if ((limit === 0 || !limit)) {
      return await productModel.paginate(query, { paginate: false, page: page || 1, sort: { price: sort || 0 } })
    } else {
      return await productModel.paginate(query, { limit: limit || false, page: page || 1, sort: { price: sort || 0 } })
    }
  }


  async getProductById(id) {
    return productModel.findById(id)
  }


  async createProduct(product) {
    try {
      return await productModel.create(product)
    } catch (error) {
      return error.message
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      return await productModel.findByIdAndUpdate(id, updatedProduct, { new: true })

    } catch (error) {
      return error
    }
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id)
  }
}

export default new productDao();

