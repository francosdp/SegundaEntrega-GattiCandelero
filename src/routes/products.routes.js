import { Router } from "express";
import ProductManager from "../services/ProductManager.js";


const router = Router()
const productManager = new ProductManager()






router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await productManager.getAllProducts(limit)
        res.json(products)
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }
        const newProduct = await productManager.addProduct({ title, description, code, price, stock, category })

        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
    }
})


router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        res.json(product);

        if (!product) {
            return res.status(404).send("Producto no encontrado")
        }
    } catch (error) {
        console.log(error)
    }
});


router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const productUpdated = await productManager.updateProduct(productId, req.body);
        if (productUpdated) {
            res.json(productUpdated)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        console.log(error)
    }

})

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productManager.deteleProduct(productId)
        if (deletedProduct) {
            res.json(deletedProduct)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        console.log(error)
    }

})

export default router;