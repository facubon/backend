import express from 'express'
import productRoutes from './src/routes/products.routes.js'
import viewsRoutes from './src/routes/views.router.js'
import chatRoutes from './src/routes/chat.routes.js'
import handlebars from 'express-handlebars'
import cartRoutes from './src/routes/carts.routes.js'
import mongoose from 'mongoose'
import __dirname from './dirname.js'
import chatDao from './src/dao/chatDao.js'
import Handlebars from 'handlebars'
import path from 'path'
import { Server } from 'socket.io'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Inicializacion de websocket por lado de servidor
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new Server(httpServer)


// CONFIGURACION DE HANDLEBARS 
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('views', __dirname + '/src/views')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/src/public')));


// ROUTES 
app.use('/', viewsRoutes)
app.use('/chat', chatRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)

// APLICACION DE BASE DE DATOS CON MONGOOSE 
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://CoderGermancho:coderBackend2023@codercluster.dzpfie2.mongodb.net/?retryWrites=true&w=majority', (error) => {
  if (error) {
    console.log('Cannot connect to database' + error)
    process.exit()
  }
})

// SOCKET IO 
io.on('connection', async (socket) => {

  socket.emit("historialChat", await chatDao.getMessages())


  socket.on("mensajeNuevo", async (data) => {
    let message = {
      user: data.user,
      message: data.message
    }
    await chatDao.registerMessage(message)
    io.emit("historialChat", await chatDao.getMessages())

  })


})
