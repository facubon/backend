import mongoose from 'mongoose'

const chatCollection = 'messages'

const chatSchema = new mongoose.Schema({
    user : String, 
    message: String
})


export const chatModel = mongoose.model(chatCollection, chatSchema)
