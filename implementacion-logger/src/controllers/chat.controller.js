import chatValidator from "../validators/chat.validator.js"

class chatController {


  async getMessages(req, res) {
    const result = await chatValidator.getMessages({})
    req.logger.debug(result)

    return result

  }

  async createMessage(message) {
    await chatValidator.createMessage(message)
  }

}

export default new chatController()
