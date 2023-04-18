import winston from 'winston'
import config from '../config/config.js'






//implemento los colores segun el error  y les doy un valor a cada error asignandole un numero
const customLevelsOptions = {
    colors: {
        fatal: 'negro',
        error: "rojo",
        warning: 'verde',
        info: 'azul',
        http: 'amarillo',
        debug: 'violeta',
  },
  

    levels: {
        fatal: 190,
        error: 202,
        warning:213,
        info: 250,
        http: 560,
        debug: 980,
      },
  }





const prettyJson = winston.format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4)
  }
  return `${info.level}: ${info.message}`
})



//creo la constante de logger
const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: config.log_level,
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.simple(),
        prettyJson
      )
    }),




//creo la carpeta errors.log donde se guardaran
    new winston.transports.File({
      filename: "./errors.log",
      level: 'warning',
      format: winston.format.simple()
    })
  ]
})








export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
  next();

}