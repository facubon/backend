import multer from 'multer'
import __dirname from '../../dirname.js'
const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, process.cwd()+'/src/uploads/')
  },
  filename: function(req, file, callback){
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

export const uploader = multer({ storage })
