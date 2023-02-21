import { Router } from "express";

const router = Router();

//passport github
router.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
  });
  
  router.get('/login', (req, res) => {
    res.render('login');
  });




  
//Formulario
router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/register',(req, res) => {
  res.render('register');
})

router.get('/profile', (req, res) => {
  if(!req.session.user) {
    return res.redirect('/login');
  }
  res.render('profile', { user: req.session.user });
})



export default router;