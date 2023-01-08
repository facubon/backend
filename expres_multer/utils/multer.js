import multer from  'multer'

const storage = multer.diskStorage({
    destination:function (req,file,callback){
        callback(null,'./uploads')
    },
    filename:function(reque,file,callback){
        callback(null,)
    }
})



export const uploader = multer ({storage})