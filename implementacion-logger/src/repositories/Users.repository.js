export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers() {
    return await this.dao.getUsers()
  }

  async getUserById(id) {
    return await this.dao.getUserById(id)
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email)
  }

  async createUser(data) {
    return await this.dao.createUser(data)
  }

  async updateUser(id, data) {
    return await this.dao.updateUser(id, data)
  }
  async deleteUser(id) {
    return await this.dao.deleteUser(id)
  }



}
