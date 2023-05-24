import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  phone: String,
  role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
})

export const userModel = model(userCollection, userSchema)
