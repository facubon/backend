
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

        //se llamara al metodo addproducts con los mismos campos que arriba y tiene que arrojar un error porq estara repetido//
        //nose como hacer este paso... si hacer  addProduct (product) para llamar al metodo y pasarle los mismos campos y ahi {if/else si es igual que ponga un error y si es distinto que lo agrege al array }//
       
    




    //Hago que si se repite el ID me tire un mensaje    (este paso no estoy seguro si esta bien porq al probarlo en la consola no me aparece nada)        //
        getProductsById (id){
            //busco que se encuentre el id//
            let product = this.Products.find (e => e.id === id)
            
            if (product){
                return product;
            }else{
                console.log (error)
            }

            
        }
        
      
    
    

}




//Creo la constante para la class//

const product = new ProductManager();


//Declaro la info que van a tener los campos de product//
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123" , 25);
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123" , 25);




//Llamo al metodo getproducts nuevamente y aparece el producto recien agregado//
console.log (product.getProducts())





