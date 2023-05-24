import ticketModel from "../models/ticket.models.js";


class ticketDao {


  async createTicket(ticket) {
    return await ticketModel.create(ticket)
  }
}


export default new ticketDao()
