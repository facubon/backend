import express from 'express';





//creo servidor de express//
const server = express ()
const productos = [
    {id:"1", producto:"teclado"},
    {id:"2", producto:"mouse"},
    {id:"3", producto:"joystick"},
    {id:"4", producto:"auriculares"},
    {id:"5", producto:"cables"},
    {id:"6", producto:"monitor"},
    {id:"7", producto:"teclas"},
    {id:"8", producto:"notebook"},
    {id:"9", producto:"adaptador"},
    {id:"10", producto:"pad"},
]


//--------------EndPoints--------------//
server.get('/',(req,res) => {
    res.send('corriendo en el servidor 8080')
})

//Lamo los 10 productos al endpoint products//
server.get('/products',(req,res) =>{
    res.send({productos})
   
})

//llamo al id 2//
server.get('/products/:2',(req,res)=>{
    let idProducto =req.params.idProducto;
    let producto = productos.find(p=>p.id===idProducto);
    if(!producto) return res.send({error:"Id no encontrado"})

    res.send({productos})
    
})

server.get ('*', (req,res)=>{
    res.send('Error')
})

server.listen (8080, ()=>console.log ('listening on port 8080'))