import { Router } from "express";
import passport from 'passport'
import passportCall from "../utils/passportCall.js";
import sessionsController from "../controllers/sessions.controller.js";



const router = Router();


router.get('/failedregister', sessionsController.getFailedRegisterPage)
router.get('/login', sessionsController.getLoginPage) 
router.get('/current', passportCall('jwt'), passport.authenticate('jwt', { session: false }), sessionsController.getCurrentProfile)
router.get('/register', sessionsController.getRegisterPage) 
router.post('/login', sessionsController.postToLogin) 
router.post('/register', passport.authenticate('register', { session: false }), sessionsController.postToRegister) 

export default router;




