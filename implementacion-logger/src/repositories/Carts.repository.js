export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCarts(limit) {
    return await this.dao.getCarts(limit)
  }

  async getCartById(id) {
    return await this.dao.getCartById(id)
  }

  async createCart() {
    return await this.dao.createCart()
  }

  async updateCart(cid, product) {
    return await this.dao.updateCart(cid, product)
  }

  async updateQuantityToCart(cid, pid, quantity) {
    return await this.dao.updateQuantityToCart(cid, pid, quantity)
  }

  async deleteProductFromCart(cid, pid) {
    return await this.dao.deleteProductFromCart(cid, pid)
  }

  async emptyCart(cid) {
    return await this.dao.emptyCart(cid)
  }
  async purchase(cid) {
    return await this.dao.purchase(cid)
  }



}
