import express from 'express'
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import __dirname from './dirname.js'
import routes from './src/routes/index.routes.js'
import path from 'path'
import { Server } from 'socket.io'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import initializePassport from './src/config/passport.config.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './src/config/config.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = app.listen(config.PORT, () => console.log(`Escuchando en el puerto ${config.PORT}`))
export const io = new Server(httpServer)



app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('views', __dirname + '/src/views')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(cookieParser())


app.get('/', (req, res) => res.redirect('/api'))
app.use('/api', routes)



app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:3000",
  }));


initializePassport()
app.use(passport.initialize())
app.use(passport.session())