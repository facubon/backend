import { cartModel } from '../models/cart.models.js'
import ticketModel from '../models/ticket.models.js'

class cartDao {

  async getCarts(limit) {
    if (limit === 0 || !limit) {
      return await cartModel.find({})
    } else {
      return await cartModel.find({}).limit(limit)
    }
  }


  async getCartById(id) {
    return cartModel.findById(id).populate('products.product')
  }


  async createCart(cart) {
    return await cartModel.create(cart)
  }

  async updateCart(cid, product) {
    return await cartModel.findByIdAndUpdate({ _id: cid },
      { $push: { products: product } },
      { new: true, useFindAndModify: false })

  }
  async updateQuantityToCart(cid, pid, quantity) {
    await cartModel.findOneAndUpdate(
      {
        _id: cid,
        products: { $elemMatch: { _id: pid } }
      }, 
      {
        $set: {
          "products.$.quantity": quantity, 
        },
      },
      { new: true, safe: true, upsert: true })
  }


  async deleteProductFromCart(cid, pid) {
    return await cartModel.findByIdAndUpdate({ _id: cid },
      { $pull: { products: { _id: pid } } },
      { new: true, useFindAndModify: false })
  }

  async emptyCart(cid) {
    return await cartModel.findByIdAndUpdate({ _id: cid },
      { $set: { products: [] } })

  }

  async purchase(ticket) {
    return await ticketModel.create(ticket)

  }





}



export default new cartDao();

