
const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not logged in' })
    }

    let permiso = false
    role.forEach(rol => {
      if (req.user.role === rol) {
        permiso = true
      }
    })


    if (permiso === false) {
      req.logger.warning("No has iniciado sesion")
      return res.status(401).json({ message: 'No tienes permisos para realizar esta tarea, podes fijarte en el archivo README que es lo que podes hacer' })
    }

    next()
  }
}

export default authorization
