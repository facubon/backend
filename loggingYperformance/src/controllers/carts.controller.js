import cartValidator from "../validators/cartsValidator.js";
import config from "../config/config.js";
import nodemailer from 'nodemailer'



const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 3000,
  auth: {
    user: config.mail_account,
    pass: config.mail_pass
  }
})

class cartController {


  async getCarts(req, res) {

    let limit = parseInt(req.query.limit)

    try {
      const result = await cartValidator.getCarts(limit)
      res.render('carts', { result })
    } catch (error) {
      res.json(error)
    }
  }


  async getCartById(req, res) {
    const result = await cartValidator.getCartById(req.params.cid)
    try {
      res.render('cartById', { result })
    } catch (error) {
      res.json(error)
    }
  }

  async createCart(req, res) {
    try {
      await cartValidator.createCart()
      res.status(201).json({ info: 'Cart Created' })
      await transport.sendMail({
        from: 'FACUNDO <facundopietrobon@hotmail.com>',
        to: req.user.user,
        subject: 'nuevo carrito creado',
        html: `
         <div>
          <h1> creaste un carrito! </h1>
        </div> 
`, attachments: []

      })
    } catch (error) {
      console.log("algo paso", error)
      res.status(400).json({ info: `algo paso: ${error}` })
    }


  }

  async updateCart(req, res) {
    const cid = (req.params.cid)
    const { quantity, pid } = req.body;
    const product = { product: pid, quantity: quantity }



    try {
      await cartValidator.updateCart(cid, product)
      res.send({ status: 200, payload: await cartValidator.getCartById(cid) })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async updateQuantityFromCart(req, res) {

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      await cartValidator.updateQuantityFromCart(cid, pid, quantity)
      res.json({ message: "cantidad actualizada", payload: await cartValidator.getCartById(cid) })
    } catch (error) {
      res.json({ error: error.message })

    }

  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      await cartValidator.deleteProductFromCart(cid, pid)
      res.json({ message: `PID: ${pid} se borro de  ${cid}`, payload: await cartValidator.getCartById(cid) })
    } catch (error) {
      res.json({ error: error.message })
    }
  }



  async emptyCart(req, res) {
    let { cid } = (req.params)
    try {
      await cartValidator.emptyCart(cid)
      res.json({ status: 200, message: 'cart fue eliminado' })
    } catch (error) {
      res.json({ error })
    }
  }


  async purchase(req, res) {


    let { cid } = (req.params)
    let user = req.user


    try {
      const result = await cartValidator.purchase(cid, user)
      res.json({ message: "se genero el ticket:", result })
    } catch (Error) {
      res.json({ error: Error.message })

    }

  }


}

export default new cartController()
