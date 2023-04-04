import { chatModel } from '../models/chat.models.js'

class chatDao {

  async createMessage(message) {
    return await chatModel.create(message)
  }
  async getMessages() {
    return await chatModel.find({})
  }
}

export default new chatDao();
