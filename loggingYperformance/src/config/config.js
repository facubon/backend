import dotenv from 'dotenv';
dotenv.config()

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