import chatValidator from "../validators/chat.validator.js"

class chatController {


  async getMessages() {
    await chatValidator.getMessages()
  }

  async createMessage(message) {
    await chatValidator.createMessage(message)
  }

}

export default new chatController()