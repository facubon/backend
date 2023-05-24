export default class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTicket(ticket) {
    return await this.dao.createTicket(ticket)
  }


}
