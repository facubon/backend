const fs = require('fs');

class ProductManager{

    constructor(fileName){ 
        this.path = fileName;
    };

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    };

    async addProduct(title, description, price, thumbnail, code, stock){
        try{
            
            if(title != "" && description != "" && price != null && thumbnail != "" && code != ""){
                let product = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock, 
                }
                let products = await this.getProducts();
                let codeValues = products.find(product => product['code'] === code);
                if(!codeValues){
                    if (products.length === 0) {
                        product['id'] = 1;
                    }else{
                        product['id'] = products[products.length - 1]['id'] + 1;  
                    }
                    products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return products;
                }else{
                    console.log('Codigo de producto ya existente');
                }
            }else{
                console.log("falta informacion para agregar producto");
            }
        }catch(error){
            console.log(error);
        }
    };

    async getProductById(id){
        try{
            let products = await this.getProducts();
            let myProduct = products.find((product) => product.id === id);
            if(myProduct != null){
                return myProduct;
            }else{
                console.log('Producto no encontrado');
            }
        }catch(error){
            console.log(error);
        }
    };

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try{
            let products = await this.getProducts();
            let myProduct = products.find((product) => product['id'] === id);
            if(myProduct!= null){
                myProduct.title = title;
                myProduct.description = description;
                myProduct.price = price;
                myProduct.thumbnail = thumbnail;
                myProduct.code = code;
                myProduct.stock = stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch(error){
            console.log(error);
        }
    };

    async deleteProduct(id){
        try{
            let products = await this.getProducts();
            let myProduct = products.find(product => product['id'] === id);
            if(myProduct!= null){
                products.splice(products.indexOf(myProduct), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    };
};


let fileName = "./Products.JSON";
let productos = new ProductManager(fileName);

//productos.getProducts().then((res) => console.log(res));

//productos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25).then((res) => console.log(res));

//productos.getProductById(1).then(res => console.log(res));

//productos.getProductById(2).then(res => console.log(res));

//productos.updateProduct(1, 'update producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25).then(()=> productos.getProducts().then((res) => console.log(res)));

//productos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'ac123', 25).then((res) => console.log(res));

productos.deleteProduct(3).then(()=> productos.getProducts().then((res) => console.log(res)));
Footer

