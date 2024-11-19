import { Router } from "express";
import CartManager from "../services/CartManager.js"

const router = Router()
const cartManager = new CartManager()

router.post('/', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts()
        const newCart = await cartManager.addCart()

        res.status(201).json({
            newCart: newCart,
            carts: carts
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cartFoundProducts = await cartManager.findCart(cartId)
        if (!cartFoundProducts) {
            return res.status(404).send("Carrito no encontrado")

        } else {
            res.json(cartFoundProducts)
        }
    } catch (error) {
        console.log(error)
    }
})








router.post('/', async (req, res) => {

    try {
        const newProduct = await cartManager.addProduct(req.body)



    } catch (error) {
        console.log(error)
    }


})


export default router;