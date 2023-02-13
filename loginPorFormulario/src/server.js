import  express  from "express";
import cookieParser from "cookie-parser";
import session from 'express-session';
import FileStore from 'session-file-store';

const FileStorage = new FileStore (session);
const app = express();

// Server config
app.use = (cookieParser());

app.use (session({
    secret: 's1k2a3',
    resave: false,
    saveUninitialized: false,
    store: new FileStorage ({path:'./src/sessions', retries: 0, ttl: 60})
}))

//endpoints

app.get('/', (req, res) => {
    if(!req.session.contador) {
      req.session.contador = 0
    }
  
    req.session.contador++;
  
    res.send(`Contador: ${req.session.contador}`)
  })
  
  app.get('/session', (req, res) => {
    res.send(req.session)
  })
  
  app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Sesion eliminada')
  })











app.listen(3000, () => console.log(`Server on port 3000`))