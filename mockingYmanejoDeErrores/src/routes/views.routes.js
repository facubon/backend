import { Router } from 'express'
import CustomError from '../utils/CustomError.js'
import EErrors from '../utils/EErrors.js'

const router = Router()



router.get('/', (req, res) => {
  res.render('index')
})

router.get('*', (req, res) => {
  CustomError.createError({
    name: 'error al traer la pagina',
    cause: "Endpoint no encontrado!",
    message: "no se puede mostrar la pagina que estas buscando",
    code: EErrors.ROUTING_ERROR
  })


})



export default router;
