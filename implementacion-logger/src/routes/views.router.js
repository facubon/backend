import { Router } from 'express'

const router = Router()



router.get('/', (req, res) => {
  res.render('index')
})

router.get('/loggerTest', (req, res) => {
  req.logger.fatal("Este es un log a nivel fatal")
  req.logger.error("Este es un log a nivel error")
  req.logger.warning("Este es un log a nivel warning")
  req.logger.info("Este es un log a nivel info")
  req.logger.http("Este es un log a nivel http")
  req.logger.debug("Este es un log a nivel debug")
  res.send("Comprobar en consola los logs ")
})

export default router;
