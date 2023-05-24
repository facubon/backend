const generateProductErrorInfo = product => {
  return `Some properties were not valid
  List of required properties: 
  *title : needs to be a Non-Empty String, received ${product.title}
  *description : needs to be a Non-Empty String, received ${product.description}
  *category : needs to be a Non-Empty String, received ${product.category}
  *price : needs to be a Non-Empty Number, received ${product.price}
  *code : needs to be a Non-Empty Number, received ${product.code}
  *stock : needs to be a Non-Empty String, received ${product.stock}


`
}

export default generateProductErrorInfo
