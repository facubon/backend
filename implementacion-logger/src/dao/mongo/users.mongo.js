import { userModel } from "../models/user.models.js";

class UserDao {
  async getUsers() {
    return await userModel.find();
  }

  async getUserById(id) {
    return await userModel.findOne({ _id: id });
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email });
  }

  async createUser(data) {
    return await userModel.create(data);
  }

  async updateUser(id, data) {
    return await userModel.updateOne({ _id: id }, { $set: data });
  }

  async deleteUser(id) {
    return await userModel.deleteOne({ _id: id });
  }
}

export default new UserDao()
