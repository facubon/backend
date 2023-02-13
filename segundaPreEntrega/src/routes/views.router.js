import {Router} from 'express'
import productDao from '../dao/productDao.js'
import cartDao from '../dao/cartDao.js'



const router = Router()

router.get('/products', async (req, res) => {

  let limit = 3; 
  let query = req.query.query || null
  let sort = parseInt(req.query.sort)
  let page = parseInt(req.query.page)

  try {
    let result = await productDao.getProducts(limit, JSON.parse(query), sort, page)
    res.render('products',{result})
  } catch (error) {
    res.json({ message: 'Ha ocurrido un error, verifique bien los datos ingresados' })
  }
})

router.get('/carts/:cid', async (req, res) => {

  const cid = (req.params.cid)
  try {
    let result = await cartDao.getCartById(cid)
    console.log(result.products)
    res.render('cart', {result})
  } catch (error) {
    res.json({ error })
  }
})


export default router;