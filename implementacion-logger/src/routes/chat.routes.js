import { Router } from 'express'
import { io } from '../../server.js'
import chatController from '../controllers/chat.controller.js'
import passport from 'passport'
import passportCall from "../utils/passportCall.js";
import authorization from "../utils/autorization.js";



const router = Router()

router.get('/', passportCall('jwt'), authorization(['user']), passport.authenticate('jwt', { session: false }), (req, res) => {


  io.on('connection', async (socket) => {

    console.log("Socket connected")
    console.log(await chatController.getMessages())


    socket.on("mensajeNuevo", async (data) => {
      let message = {
        user: data.user,
        message: data.message
      }
      await chatController.createMessage(message)
      io.emit("historialChat", await chatController.getMessages())
    })



    socket.emit("historialChat", await chatController.getMessages())
    console.log("Desde router", await chatController.getMessages())
  })


  res.render('chat');
})

export default router;
