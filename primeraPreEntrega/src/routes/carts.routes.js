const {Router} = require ('express');
const Cart = require ('../models/cart.model');
const File = require('../container/File')

const router = Router();
const container = new File ('cart');
const containerProducts = new File ('products');

router.get ('/', (req,res) =>{
    res.json(container.getAll());

})

router.get ('/:id', (req,res)=>{
    const {id} = req.params;
    res.json (container.getById(Number(id)));
})

router.get ('/:id/products', (req,res)=>{
    const {id} = req.params;
    const cart = container.getById (number(id));

    res.json ({cartId: id, products: cart.products})

})

router.get ('/:id/products/:id_prod', (req,res)=>{
    const {id, id_prod} = req.params;
    const cart = container.getById (number(id));

    const product = cart.products.find((product) => product.id === number (id_prod));

})

router.post ('/', (req,res)=>{
    const cart = new Cart()
    const response = container.save (cart);

    res.json(response);

})


router.post ('/:id/products',  async (req,res)=>{
    const {id} = req.params;
    const {id_prod} = req.body;

    const cart = container.getById(number(id));

    let response = '';
   // if (typeof id_prod !== 'Array'){
        //throw new Error ('id_prod debe ser un array')
              
    

       await  id_prod.foreach ( async (id) => {
            const product = container.getById(number(id));

            if(product){
                let existe = false;
                if (cart.products){
                    existe = cart.products.find ((product) => product.id === number (id));
                    if (!existe){
                        cart.products.push ({quantity:1, id})
                    }else{
                        const index = cart.products.indexOf((product) => product.id === number (id));
                        cart.products[index].quantity += 1;
                    }
                     response =  await container.update (number(id),cart);
                   
                }
            } else{
                response = 'No existe el producto!'
            }
        });

        res.json(response);
        
    });



router.delete ('/:id', async (req,res)=>{
    const {id} = req.params;
    const response = await container.delete(id)

})

router.delete ('/:id/products/:id_prod', async (req,res)=>{
    const {id, id_prod} = req.params;
    const cart = container.getById(number(id));

    const newproducts = cart.products.filter((product) => product.id !== number (id_prod));

    cart.products = newProducts;
    const response =  await container.update(numer(id), cart);
    res.json (response);
    
})


module.exports = router;