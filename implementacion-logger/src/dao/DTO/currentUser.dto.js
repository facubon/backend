export default class currentUserDTO {
  constructor(user) {
    this.email = user.email
    this.role = user.role
    this.phone = user.phone
  }
}
