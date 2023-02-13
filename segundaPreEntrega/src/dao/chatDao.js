import { chatModel } from '../dao/models/chat.models.js'

class chatDao {

  async registerMessage(message) {
    return await chatModel.create(message)
  }
  async getMessages() {
    return await chatModel.find({})
  }j
} 
 
export default new chatDao();
