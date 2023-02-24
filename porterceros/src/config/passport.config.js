import passport from 'passport'
import local from 'passport-local'
import { userModel } from "../models/users.models.js";
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;
const initializePassport = () => {



  passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;
      try {
        let user = await userModel.findOne({ email: username })
        if (user) {
          console.log('Usuario ya existe')
          return done(null, false)
        }
        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: createHash(password)
        }
        let result = await userModel.create(newUser)
        return done(null, result)
      } catch (error) {
        res.send(error)
      }
    }
  ))

  passport.use('github', new GitHubStrategy({
    clientID: "Iv1.1f5073830c9c3348",
    clientSecret: '4d0b58b00345a79b902d1c163b34cbbf70832e8c',
    callbackURL: 'http://localhost:8080/session/githubcallback',
     scope: "user:email"
  }
    , async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await userModel.findOne({ email: profile.emails[0].value })
        if (!user) {
          const newUser = {
            first_name: profile._json.name,
            last_name: 'undefined',
            email: profile.emails[0].value,
            age: 'undefined',
            password: 'undefined'
          }
          let result = userModel.create(newUser)
          done(null, result)
        } else {
          done(null, user)
        }
      } catch (error) {
        return done(error)
      }

    }))

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username })
      if (!user) {
        console.log('Usuario no encontrado')
        return done(null, false)
      }
      if (!isValidPassword(user, password)) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }))
}

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id)
  done(null, user)
})


export default initializePassport;


