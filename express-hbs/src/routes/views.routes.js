import { Router } from "express";

const router = Router();


router.get ('/', (res,req)=>{
    res.render ('index', {
        title: "productos con websocket"

})
})

export default router;