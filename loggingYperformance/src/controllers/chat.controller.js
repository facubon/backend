import chatValidator from "../validators/chat.validator.js"

class chatController {


  async getMessages() {

    const result = await chatValidator.getMessages({})
    return result

  }

  async createMessage(message) {
    await chatValidator.createMessage(message)
  }

}

export default new chatController()
