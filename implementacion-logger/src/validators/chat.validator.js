import { ChatService } from "../repositories/index.js"



class chatValidator {

  async getMessages() {
    return await ChatService.getMessages()
  }

  async createMessage(message) {
    await ChatService.createMessage(message)
  }



}


export default new chatValidator()
