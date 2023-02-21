import { Router } from "express";
import { userModel } from "../models/user.model.js";
import passport from "passport";


const router = Router();


//passport github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/githubcallback', passport.authenticate('github', { failureredirect: '/login' }), (req, res) => {
  req.session.user = req.user
  res.redirect('/');
});




//formulario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user["password"] = undefined;
    req.session.user = user;

    res.status(200).redirect("/profile");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  console.log(req.body)

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      password,
      
    });
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})


export default router;


