
//Creo instancia ProductManager y la llamo Products//

class ProductManager {
    constructor (){
        this.Products = [];
    }

    getProducts(){
        return this.Products;
    }


    //Llamo al metodo addProducts//  

addProduct(title,description,price,thumbnail,code,stock)  {

    let product ={
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };
     

    //Agrego el objeto generando un nuevo campo ID y hago que se incremente a medida que agrego objetos//

    if(this.Products.length === 0) {
        product ["id"] = 1;
    } else {
        //Llamo al ultimo elemento del array y le sumo uno//
        product ["id"] = this.Products [this.Products.length -1] ["id"] + 1;
    }
    this.Products.push (product);
    
}

    //Hago que si se repite el ID me tire un mensaje//
    agregarId (idProducto, idStock) {
        let respuesta;
        for (let i = 0 ; i < this.Products.length; i ++){
            if (this.Products [i].id === idProducto){
                if (this.Products[i].stock.includes(idStock)){
                    respuesta = "El objeto esta repetido";
                    
                    break;
                    
                }
                this.Products [i].stock.push(idStock);
                respuesta = "stock agregado";
                break;
                
            }
        }
       
        
        
        return respuesta;
        
      
    }
    

}




//Creo la constante para la class//

const product = new ProductManager();


//Declaro la info que van a tener los campos de product//
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123" , 25);
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123" , 25);




//Llamo al metodo getproducts nuevamente y aparece el producto recien agregado//
console.log (product.getProducts())





