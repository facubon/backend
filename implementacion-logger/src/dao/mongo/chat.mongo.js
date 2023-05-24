import { chatModel } from '../models/chat.models.js'

class chatDao {

  async createMessage(message) {
    return await chatModel.create(message)
  }
  async getMessages() {
    const result = await chatModel.find()
    return result
  }
}

export default new chatDao();

