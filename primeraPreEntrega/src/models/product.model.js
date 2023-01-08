class ProductModel {
    constructor (title,description,code,price,status,stock,category,thumbnail){
        this.title = title || '';
        this.description = description || 0;
        this.code = code || 0;
        this.price = price || 0;
        this.status = status || 0;
        this.stock = stock || 0;
        this.category = category ||0;
        this.thumbnail = thumbnail || [];
    }
}

module.exports = ProductModel;