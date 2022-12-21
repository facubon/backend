const http = require ('http');


const server = http.createServer ((peticion, respuesta) => {
    respuesta.end('Mi primer servidor!!')

})





//Declaro el puerto 8080//
server.listen(8080, ()=> console.log('server listening on port 8080'))