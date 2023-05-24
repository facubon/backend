
import { ProductService as productServices } from "../repositories/index.js";
import CustomError from "../utils/CustomError.js";
import EErrors from "../utils/EErrors.js";
import generateProductErrorInfo from "../utils/generateProductErrorInfo.js";
import mockingProductsGenerator from '../utils/mockingProductsGenerator.js'

class productValidator {

  async getProducts(limit, query, sort, page) {
    try {
      const products = await productServices.getProducts(limit, query, sort, page)
      return products
    } catch (error) {
      return error;

    }
  }

  async getMockingProducts() {
    try {
      const products = mockingProductsGenerator()
      return products;
    } catch (error) {
      return error
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
    if (!title || !description || !category || !price || !thumbnailName || !code || !stock) {
      CustomError.createError({
        name: 'Error creating product',
        cause: generateProductErrorInfo({ title, description, category, price, code, stock }),
        message: "Error trying to create product",
        code: EErrors.MISSING_DATA
      })
    }



    try {
      const product = { title, description, category, price, thumbnailName, code, stock }
      return await productServices.createProduct(product)
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

