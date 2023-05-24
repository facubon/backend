
import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
  }

  async addProduct(title, description, category, price, thumbnail, code, stock) {
    let producto = {
      'title': title,
      'description': description,
      "category": category,
      'price': price,
      'thumbnail': thumbnail,
      'code': code,
      'status': true,
      'stock': stock,
    }

    this.products.length === 0 ? producto["id"] = 1 : producto["id"] = this.products[this.products.length - 1]["id"] + 1
    let encontrado = this.products.some(elemento => elemento.code === code)

    if (encontrado) return false
    else {
      this.products.push(producto)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
      return true;
    }


  }

  getProducts = () => {
    return this.products
  }

  getElementById = (id) => {
    let producto = this.products.find(el => el.id === id)
    return producto
  }


  async updateProduct(id, campo, valorNuevo) {

    let index = this.products.findIndex(element => element.id === id)
    let campoValido;
    index === -1 ? false : campoValido = Object.keys(this.products[index]).some(el => el === campo)


    if (campo === 'id' || !campoValido) {
      return false
    } else {
      this.products[index][campo] = valorNuevo;
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
      return true;
    }


  }


  async deleteProduct(id) {
    let encontrado = this.products.some(el => el.id === id)
    if (encontrado) {
      this.products = this.products.filter(el => el.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
      return true;
    } else {
      return false;
    }
  }
}


export default new ProductManager('./productos.json')
