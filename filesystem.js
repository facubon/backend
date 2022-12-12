const fs = require ('fs');



class ProductManager {
    constructor (filename) {
       
        //------ Si existe el archivo lo parsea y crea el array de productos y si no existe crea el array vacio----//

        if (fs.existsSync(filename)){
            this.filename = ('./productos.json');
            this.products = json.parse(fs.readFileSync('./productos.json','utf-8'));
        } else{
            this.products = [];
        }
    }
    
    //-----creo el producto y su indice de contenido----/
    async createProduct (title,description,price,thumbnail,code,stock){
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

       

        //----cargo los productos al array---/
        this.products.push(producto);

        //----creo la hoja productos.json con el writefile y con stringify convierto el objeto a una cadena de texto---//
       await fs.promises.writeFile('./productos.json', JSON.stringify(this.products, null, '\t'))
    }

    //----con readfile leo la hoja creada de productos.json -----/
    async getProducts (){
        return JSON.parse(await fs.promises.readFile('./productos.json'))
    }


    //-----Busco el ID del producto-----//
    getProductsById (id){
        try{
            return this.products.filter(producto => producto.id ===id);
        }catch (error){
            return "Error no existe este producto"
        }
        
    }


}

    //----incremento el id a medida que se agregan----/
     function save(producto){
        if(this.Products.length === 0) {
          producto ["id"] = 1;
      
     } else {

     //Llamo al ultimo elemento del array y le sumo uno//
     producto ["id"] = this.Products [this.Products.length -1] ["id"] + 1;

     this.products.push(producto);

    
        
    
 }}


 function deleteProduct (){
    fs.unlink(this.filename)
 }

    

    

    
        
    


//------cargo los productos en la hoja productos.json y les paso su contenido al indice que nombre mas arriba en createProduct-------//
const updateProduct = new ProductManager ('products.json')

updateProduct.createProduct({
    title: 'hola',
    description:'este es un producto prueba',
    price: 200,
    thumbnail:'sin imagen',
    code:'abc123',
    stock:25,


})







updateProduct.getProducts()
.then(data=>console.log(data))

























