import { Router } from 'express'
import { userModel } from "../models/users.models.js";
import { createHash } from '../utils.js'
import passport from 'passport'

const router = Router()

router.post('/login', passport.authenticate('login', {failureRedirect: '/session/failedlogin'}), async (req,res) => {
  if (!req.user) return res.status(400).send({status:'error', error:'Credenciales invalidas'})
  req.session.user = {
  first_name : req.user.first_name, 
  last_name : req.user.last_name, 
  age: req.user.age, 
  email : req.user.email
  }
  res.render('profile', {user:req.session.user})
})
router.get('/github', passport.authenticate('github', {scope: ['user:email'] }))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async (req,res) => {
  req.session.user = req.user; 
  res.redirect('/profile')
})


router.get('/failedlogin', (req,res) => {
  res.send({message:'Failed Login'})
})
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
  res.send({ status: 'success', message: 'Usuario Registrado' })
})

router.get('/failregister', (req,res) => {
  console.log('Ha ocurrido un problema en la registracion')
  res.send({status:'failure', message:"Ha ocurrido un problema en la registracion"})
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default router;
