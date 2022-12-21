
//Creo instancia ProductManager y la llamo Products//

class ProductManager {
    constructor (){
        this.Products = [];
    }

    getProducts(){
        return this.Products;
    }


    // Paso 3 Llamo al metodo addProducts//  
                
addProduct(title,description,price,thumbnail,code,stock) {


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





    //Hago que si se repite el ID me tire un mensaje //
        getProductsById (id){
            //busco que se encuentre el id//
            let products = this.Products.find (e => e.id === id)

            
            if (products){
                return products;

               
                
            }else {
                console.log ("error producto no encontrado")
                
                
            }

         




     //se llamara al metodo addproducts con los mismos campos que arriba y tiene que arrojar un error porq estara repetido//       
    // si se repite pongo un error y si no se repite mando un mensaje//



            //creo una variable para validad si esta repetido el CODE si es diferente lo cargo y si es igual muestro error producto repetido//
     let getProductsRepetido = this.Products.find (product => product['code'] ===code)
         if (!getProductsRepetido){
         this.products.push(product)
      

     } else{
        console.log ("ERROR  producto repetido")
      
      }
   

            

            
        }
        
      
    
    

}







 

//Creo la constante para la class//

const product = new ProductManager();


//Declaro la info que van a tener los campos de product//
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123" , 25);


product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123" , 25);




let id = 1;

console.log (product.getProductsById(id))   //De esta manera pruebo el paso de getProductsById si en el id pongo 1 o 2 aparece si pongo otro numero me salta error -Funciona-//




//Llamo al metodo getproducts nuevamente y aparece el producto recien agregado//

console.log (product.getProducts())











