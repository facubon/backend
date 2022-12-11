const fs = require ('fs');



class ProductManager {
    constructor (filename) {

        // Si existe el archivo lo parsea y crea el array de productos y si no existe crea el array vacio//

        if (fs.existsSync(filename)){
            this.products = json.parse(fs.readFileSync(filename,'utf-8'));
        } else{
            this.products = [];
        }
    }
    
    async createProduct (title,description,price,thumbnail,code,stock){
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(producto);

        await fs.promises.writeFile(filename, JSON.stringify(this.products, null, '\t'))
    }

    async getProducts (){
        return JSON.parse(await fs.promises.readFile(filename, 'utf-8'))
    }
}



























