import { cartModel } from '../dao/models/cart.models.js'

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
    // let carritoACargar = await cartModel.findById(id)
    // carritoACargar.products.push(product)
    // return await cartModel.findByIdAndUpdate(id, carritoACargar, { new: true })
    return await cartModel.findByIdAndUpdate({ _id: cid },
      { $push: { products: product } },
      { new: true, useFindAndModify: false })

  }
  async updateQuantityToCart(cid, pid, quantity) {
    await cartModel.findOneAndUpdate(
      {
        _id: cid,
        products: { $elemMatch: { _id: pid } }
      }, // FILTER
      {
        $set: {
          "products.$.quantity": quantity, // UPDATE
        },
      },
      { new: true, safe: true, upsert: true })
  }


  async deleteProductFromCart(cid, pid) {
    return await cartModel.findByIdAndUpdate({ _id: cid },
      { $pull: { products: { product: pid } } },
      { new: true, useFindAndModify: false })
  }

  async emptyCart(cid) {
    return await cartModel.findByIdAndUpdate({ _id: cid },
      { $set: { products: []  } })

  }



}



export default new cartDao();
