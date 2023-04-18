const authorization = (role) => {
    return async (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'no estas logeado' })
      }
  
      let permiso = false
      role.forEach(rol => {
        if (req.user.role === rol) {
          permiso = true
        }
      })
  
  
      if (permiso === false) {
        return res.status(401).json({ message: 'no tenes permiso para realizar esta tarea' })
      }
  
      next()
    }
  }
  
  export default authorization