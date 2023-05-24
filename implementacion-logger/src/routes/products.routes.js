import { Router } from 'express'
import { uploader } from '../utils/multer.js'
import productsController from '../controllers/products.controller.js';
import passport from 'passport'
import passportCall from "../utils/passportCall.js";
import authorization from "../utils/autorization.js";





const router = Router()

router.get('/', productsController.getProducts) 
router.get('/mockingproducts', productsController.getMockingProducts)
router.get('/:pid', productsController.getProductById)
router.post('/', passportCall('jwt'), authorization(['admin']), passport.authenticate('jwt', { session: false }), uploader.single('thumbnail'), productsController.createProduct)
router.put('/:pid', passportCall('jwt'), authorization(['admin']), passport.authenticate('jwt', { session: false }), productsController.editProduct)
router.delete('/:pid', passportCall('jwt'), authorization(['admin']), passport.authenticate('jwt', { session: false }), productsController.deleteProduct)



export default router;

