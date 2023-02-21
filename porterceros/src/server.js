import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { userModel } from "./models/user.model.js";
import viewsRoutes from "./routes/views.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import initializaPassport from './config/passport.config.js';


const app = express();

//CSS
app.use(express.static('public'));

// Server config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(



    
  //Creo la carpeta sessions en mongodb para guardar los usuarios creados sin passport
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://user_fp:DPYFgcmeYg4z1DwW@coderhousecluster.jcrt1ix.mongodb.net/coderhouse',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      },
      ttl: 60,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect('mongodb+srv://user_fp:DPYFgcmeYg4z1DwW@coderhousecluster.jcrt1ix.mongodb.net/coderhouse')
  .then(() => console.log("Connected to MongoDB"))

// Handlebars config
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Routes
app.use("/", viewsRoutes);
app.use("/api/session", sessionRoutes);
app.get('*', (req, res) => { res.status(404).send('404 not found') })

//passport 
initializaPassport()
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())

// Server start
app.listen(3000, () => console.log("Server running on port 3000"))
