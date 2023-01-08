import { Router} from 'express'
import ProductManager from '../ProductManager.js'

const router = Router ()
const newProducts = []

// Ruta raiz debe listar todos los productos de la base//
router.get ('/',(req,res) =>{
    
    let limit = parseInt(req.query.limit)
    try {
     if (limit === 0 || !limit) {
        res.json(ProductManager.getProducts())
     } else {
        const arrayOriginal = ProductManager.getProducts()
       let arrayConLimite = arrayOriginal.slice(0,limit) 
       res.json(arrayConLimite)
     }
    } catch (error) {
      console.log("Error", error)
      res.send("Ha ocurrido un error")
    }
     
})



// Ruta raiz pid debe traer solo el ID y un error si no se encuentra //
//no me funciona y nose porq no me trae los ids......//
router.get('/:id',  async (req,res) => {
    

    let {id}= req.params; 
    let response =  await ProductManager.getElementById(id)
   
    ?res.status(200).json(response)
    : res.status(400).json({"error": "producto no encontrado!"})
 })
 
 router.get('*', (req,res) => {
   res.send("Pagina no encontradaa")
 })
//.......................................................................//

// Agrego nuevo producto//
router.post ('/', (req,res) => {
  const {title, description, code, price, status, stock, category, thumbnails} = req.body

  const newProduct = {
    //el ID no se manda desde Body//
    id: newProducts.length == 0 ? 1 : newProducts.length + 1,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails

  }

  newProducts.push(newProduct)

  res.status(201).json({info: "Nuevo producto creado", newProduct})
})

router.put ('/:id', (req,res)=>{
  const {id} = req.params
  const {newProducts} = req.body

  const productoAnterior = newProducts [number(id) -1]
  newProducts[number(id)] =productoAnterior
  
  res.json({productoActualizado: newProducts,
  productoAnterior })
})

export default router


