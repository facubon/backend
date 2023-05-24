

import fs from 'fs'

class CartManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.cart = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.cart = [];
  }

  async createCart() {
    let carrito = {
      "products": []
    }

    this.cart.length === 0 ? carrito["id"] = 1 : carrito["id"] = this.cart[this.cart.length - 1]["id"] + 1
    this.cart.push(carrito)
    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))


  }

  async addToCart(CartId, ProductId, quantity) {
    let index = this.cart.findIndex(carrito => carrito.id === CartId)
    if (index === -1 || this.cart[index]["products"] === undefined) return false;
    let indexProducto = this.cart[index]["products"].findIndex(pid => pid.productId === ProductId)
    let yaExistente = this.cart[index]["products"].some(pid => pid.productId === ProductId)


     if (yaExistente) {
      this.cart[index]["products"][indexProducto]["quantity"] += quantity;
    } else {
      this.cart[index]["products"].push({ "productId": ProductId, "quantity": quantity })
    }
    

    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
    return true;

  }


  getCart = (id) => {
    let carrito = this.cart.find(el => el.id === id)
    return carrito || false
  }

}


export default new CartManager('./carrito.json')
