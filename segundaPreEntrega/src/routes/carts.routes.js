import { Router } from 'express'
import CartManager from '../dao/fs/CartManager.js'
import cartDao from '../dao/cartDao.js'
import productDao from '../dao/productDao.js'
import { cartModel } from '../dao/models/cart.models.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    res.json(await cartDao.getCarts());
  } catch (error) {
    res.json({ error })
  }
})


router.get('/:cid', async (req, res) => {

  const cid = (req.params.cid)
  try {
    res.json(await cartDao.getCartById(cid))
  } catch (error) {
    res.json({ error })
  }
})

router.post('/', async (req, res) => {
  try {
    await cartDao.createCart(req.body)
    res.json({ status: 'Success' })
  } catch (error) {
    res.json({ error })
  }
})

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  let enExistencia;
  const { quantity, pid } = req.body;
  // Validando si tenemos un producto en nuestra lista con el id que queremos agregar al carrito
  try {
    enExistencia = await productDao.getProductById(pid)
    if (!enExistencia) res.status(404).json({ "error": "El producto no se encuentra en la base de datos" })
    else {
      try {
        let product = { product: pid, quantity: quantity }
        cartDao.updateCart(cid, product)
        res.json({ message: 'Carrito Actualizado' })
      } catch (error) {
        res.json({ error })
      }
    }
  } catch (error) {
    res.json({ error })
  }
})
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartDao.updateQuantityToCart(cid, pid, quantity)
    res.json({ message: 'Cantidades Actualizadas' })
  } catch (error) {
    res.json({ error })
  }
})


router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartDao.deleteProductFromCart(cid, pid)
    res.json({ status: 'success', info: 'Producto eliminado de carrito' })
  } catch (error) {
    res.json({ error })
  }

})

router.delete('/:cid', async (req,res) => {
  const {cid} = req.params; 
  try {
   await cartDao.emptyCart(cid) 
    res.json({message:'Carrito Vaciado'})
  } catch (error) {
    res.json({error})
  }
})

export default router; 
