
import { Router } from 'express'
import cartController from '../controllers/carts.controller.js'
import passport from 'passport'
import passportCall from "../utils/passportCall.js";
import authorization from "../utils/autorization.js";




const router = Router()


router.get('/', cartController.getCarts) 
router.get('/:cid', cartController.getCartById) 
router.post('/', passportCall('jwt'), authorization(['user']), passport.authenticate('jwt', { session: false }), cartController.createCart)
router.post('/:cid/purchase', passportCall('jwt'), authorization(['user']), passport.authenticate('jwt', { session: false }), cartController.purchase)
router.put('/:cid', passportCall('jwt'), authorization(['user']), passport.authenticate('jwt', { session: false }), cartController.updateCart)
router.put('/:cid/products/:pid', cartController.updateQuantityFromCart) 
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart) 

export default router;


