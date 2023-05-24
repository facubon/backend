import bcrypt from 'bcrypt'

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const comparePassword = (user,password) => bcrypt.compareSync(password,user.password)
