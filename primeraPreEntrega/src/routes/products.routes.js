const {Router} = require ('express');
const File = require ('../container/file');
const ProductModel = require ('../models/product.model')

const router = Router ();
const container = new File ('products');

router.get ('/', (req,res)=>{
    res.json (container.getAll())
})

router.get ('/:id',(req,res)=>{
    const {id}= req.params;
    res.json (container.getById(number(id)));
})

router.post ('/', async (req,res)=>{

        const {title,description,code,price,status,stock,category,thumbnail} = req.body;

        const product = new Product (title,description,code,price,status,stock,category,thumbnail);

        const response = await container.save (product);
        res.json(response)

})

router.put ('/:id', async (req,res)=>{
    const {id} = req.params;

    const product = req.body
    const response =  await container.update(number(id),product);
    res.json(response);

    //if (object.keys(product) !== 'name') console.log ('el nombre es requerido');

})

router.delete ('/:id', async (req,res)=>{
    const {id} = req.params;
    const response =  await container.delete (id);

}
)

module.exports = router;