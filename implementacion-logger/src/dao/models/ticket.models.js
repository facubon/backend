
import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
  }, // random string
  cart: []
  ,
  purchaser: {
    type: String,
  },
  amount: Number,
  purchase_datetime: { type: Date, default: Date.now }
})

const ticketModel = model('ticket', ticketSchema);
export default ticketModel;
