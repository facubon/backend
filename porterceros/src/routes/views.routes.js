import {Router} from 'express'

const router = Router()

const estaLogueado = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }

  next()
}

router.get('/login', estaLogueado, (req,res) => {
  res.render('login')
})

router.get('/', (req,res) => {
  res.render('index')
})


router.get('/register', estaLogueado, (req,res) => {
  res.render('register')
})

router.get('/profile', (req,res) => {
  if (!req.session.user) return res.redirect('/login') 
  res.render('profile', {user:req.session.user})
})


export default router;