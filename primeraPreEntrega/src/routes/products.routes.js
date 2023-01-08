const {Router} = require ('express');
const File = require ('../container/file.js');
const ProductModel = require ('../models/product.model.js')

const router = Router ();
const container = new File ('products');

router.get ('/', (req,res)=>{
    res.json (container.getAll())
})

router.get ('/:id',(req,res)=>{
    const {id}= req.params;
    res.json (container.getById(id))
})

router.post ('/', (req,res)=>{
        const {title,description,code,price,status,stock,category,thumbnail} = req.body;


})

router.put ('/:id', (req,res)=>{

})

router.delete ('/:id', (req,res)=>{}
)