const generateUserErrorInfo = user => {
  return `Some properties were not valid
  List of required properties: 
  *first_name : needs to be a String, received ${user.first_name}
  *last_name : needs to be a String, received ${user.last_name}
  *email : needs to be a String, received ${user.email}
  *age : needs to be a Number, received ${user.age}
  *phone : needs to be a Number, received ${user.phone}
  *Role : needs to be a String, received ${user.role}


`
}

export default generateUserErrorInfo
