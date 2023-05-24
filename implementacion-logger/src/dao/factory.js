import config from '../config/config.js';
import mongoose from 'mongoose';


export let Users;
export let Products;
export let Carts;
export let Chat;
export let Ticket;


switch (config.persistence) {
  case 'MONGO':
    console.log('Persistence from DB')
    mongoose.set('strictQuery', false)
    mongoose.connect(config.MONGO_URI, (error) => {
      console.log('conectado a DB desde factory')
      if (error) {
        console.log('no se puede conectar a database' + error)
        process.exit()
      }
    })
    const { default: usersMongo } = await import('./mongo/users.mongo.js')
    const { default: productMongo } = await import('./mongo/products.mongo.js')
    const { default: cartMongo } = await import('./mongo/carts.mongo.js')
    const { default: chatMongo } = await import('./mongo/chat.mongo.js')
    const { default: ticketMongo } = await import('./mongo/ticket.mongo.js')

    Users = usersMongo;
    Products = productMongo;
    Carts = cartMongo;
    Chat = chatMongo;
    Ticket = ticketMongo;

    break;


  case 'MEMORY':


    const { default: usersMemory } = await import('./memory/users.memory.js')
    const { default: productMemory } = await import('./memory/products.memory.js')
    const { default: cartMemory } = await import('./memory/carts.memory.js')
    const { default: chatMemory } = await import('./memory/chat.memory.js')

    console.log("persistencia desde memoria")
    Users = usersMemory;
    Products = productMemory;
    Carts = cartMemory;
    Chat = chatMemory;


}
