export default class usersDTO {
  constructor(first_name, last_name, email, age, phone, role) {
    this.username = first_name + ' ' + last_name
    this.email = email
    this.age = age
    this.phone = phone
    this.role = role
  }
}
