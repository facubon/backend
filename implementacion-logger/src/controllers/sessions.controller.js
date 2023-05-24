import sessionValidator from '../validators/session.validator.js'
import jwt from "jsonwebtoken";
import currentUserDTO from '../dao/DTO/currentUser.dto.js';

class sessionsController {

  async getLoginPage(req, res) {
    res.render('login')
  }

  async getCurrentProfile(req, res) {
    res.render('current', { user: req.user })
  }

  async getRegisterPage(req, res) {
    res.render('register')
  }

  async postToRegister(req, res) {
    req.logger.info("Register successfully")
    res.render('login', { message: "Te has registrado exitosamente" })
  }

  async failedRegister(req, res) {
    req.logger.error("Register did not work")
    res.send({ status: 'failure', message: "Ha ocurrido un problema en la registracion" })
  }

  async postToLogin(req, res) {
    const { email, password } = req.body;

    const checkedAccount = await sessionValidator.checkAccount(email, password)
    const userToSign = new currentUserDTO(checkedAccount)

    if (checkedAccount === 'NoMailNorPassword') return res.send('Mail or password missing')
    if (checkedAccount === 'NoUser') return res.send('User has not been found')
    if (checkedAccount === 'IncorrectPassword') return res.send('Incorrect Password')
    if (checkedAccount) {
      const token = jwt.sign({ user: userToSign.email, role: userToSign.role, phone: userToSign.phone }, 'coderSecret', { expiresIn: '40m' }, { withCredentials: false });
      res.cookie('coderCokieToken', token, { maxAge: 60 * 60 * 60 * 60, httpOnly: false, withCredentials: false });
      req.logger.info("User is logged in ")
      res.redirect('/api/session/current')


    }

  }

  async getFailedRegisterPage(req, res) {
    req.logger.error("Register did not work")
    res.json({ status: 'failure', message: 'Ha ocurrido un error en el registro' })

  }

}



export default new sessionsController()
