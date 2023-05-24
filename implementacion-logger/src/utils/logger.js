import winston from 'winston'
import config from '../config/config.js'


const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'redBG black',
    error: "red",
    warning: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'greenBG black',
  }
}

const prettyJson = winston.format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4)
  }
  return `${info.level}: ${info.message}`
})

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

    new winston.transports.File({
      filename: "./errors.log",
      level: 'error',
      format: winston.format.simple()
    })
  ]
})


export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
  next();

}

