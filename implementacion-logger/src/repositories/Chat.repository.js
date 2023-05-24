export default class ChatRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getMessages() {
    return await this.dao.getMessages()
  }

  async createMessage(message) {
    return await this.dao.createMessage(message)
  }


}
