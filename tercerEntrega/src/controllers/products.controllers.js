import productValidator from "../validators/productValidator.js";

class productController {


  async getProducts(req, res) {

    let limit = parseInt(req.query.limit)
    let query = req.query.query || null
    let sort = parseInt(req.query.sort)
    let page = parseInt(req.query.page)


    try {
      const products = await productValidator.getProducts(limit, JSON.parse(query), sort, page)
      res.json(products)
    } catch (error) {
      console.log(error.message)
      res.json(error)
    }
  }


  async getProductById(req, res) {
    const products = await productValidator.getProductById(req.params.pid)
    try {
      res.json(products)
    } catch (error) {
      res.json(error)
    }
  }

  async createProduct(req, res) {
    const { title, description, category, price, thumbnail, code, stock } = req.body;
    !req.file && res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })
    let thumbnailName = req.file.filename || 'Sin Imagen';
    try {
      const addedProduct = await productValidator.createProduct(title, description, category, price, thumbnailName, code, stock)
      res.status(201).json({ info: 'Producto Agregado', addedProduct })
    } catch (error) {
      console.log("Ha ocurrido un error: \n", error)
      res.status(400).json({ info: `Ha ocurrido un error: ${error}` })
    }


  }

  async editProduct(req, res) {
    const pid = (req.params.pid)
    let updatedProduct = req.body
    try {
      await productValidator.editProduct(pid, updatedProduct)
      res.send({ status: 200, payload: updatedProduct })
    } catch (error) {
      res.json({ error: error.message })
    }
  }

  async deleteProduct(req, res) {
    let pid = (req.params.pid)
    try {
      await productValidator.deleteProduct(pid)
      res.json({ status: 200, message: 'Producto producto eliminado' })
    } catch (error) {
      res.json({ error })
    }

  }


}

export default new productController()
