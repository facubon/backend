import dotenv from 'dotenv';
import { Command } from "commander";

const program = new Command()

program
  .option("-m, --mode <mode>, 'Establish development or production mode'", 'development')


program.parse()

console.log(program.opts().mode)

dotenv.config({
  path: program.opts().mode === 'development' ? './.env.development' : './.env.production'
})

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  persistence: process.env.PERSISTENCE,
  twilio_account: process.env.TWILIO_ACCOUNT_SID,
  twilio_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_number: process.env.TWILIO_SMS_NUMBER,
  mail_account: process.env.MAIL_ACCOUNT,
  mail_pass: process.env.MAIL_PASS,
  log_level: process.env.LOG_LEVEL,
}


