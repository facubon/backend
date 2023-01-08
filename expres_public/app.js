import express from 'express'

import productsRoutes from './routes/products.routes.js'



const app = express()

// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON//
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//--------------------------------------------------------------------//


// EndPoints //


app.use('/api/products', productsRoutes)





app.listen(8080, () => {
  console.log("Listening on port 8080")
}) 




