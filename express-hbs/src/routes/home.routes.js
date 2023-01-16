import { Router } from "express";

const router = Router();
const products = []

router.post('/', (req, res) => {

    const { name, price, code } = req.body;

    const product = {
        name,
        price,
        code
      }
      products.push(product);
      console.table(products)
      res.redirect('/success')




})

export default router;