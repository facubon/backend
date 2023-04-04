import { ProductService as productServices } from "../repositories/index.js";

class productValidator {

  async getProducts(limit, query, sort, page) {
    try {
      const products = await productServices.getProducts(limit, query, sort, page)
      return products
    } catch (error) {
      return error;

    }
  }

  async getProductById(pid) {
    try {
      const products = await productServices.findById(pid)
      return products
    } catch (error) {
      return error
    }
  }

  async createProduct(title, description, category, price, thumbnailName, code, stock) {
    try {
      if (!title || !description || !category || !price || !thumbnailName || !code || !stock) {
        throw new Error("Missing Fields")
      }
      await productServices.createProduct(title, description, category, price, thumbnailName, code, stock)
    } catch (error) {
      return error;
    }
  }

  async updateProduct(pid, updatedProduct) {
    try {
      if (!pid) throw new Error("Missing PID")
      if (updatedProduct.code) throw new Error("Code field cannot be changed")
      await productServices.editProduct(pid, newProduct)
    } catch (error) {
      return error;
    }
  }


  async deleteProduct(pid) {
    try {
      if (!pid) throw new Error("Missing PID")
      await productServices.deleteProduct(pid)
    } catch (error) {
      return error;
    }
  }


}


export default new productValidator()