import { Router } from "express";

const router = Router()

const products = []


router.get('/', (req, res) => {
    res.send(products)
    console.log("get / responde")
});

router.post('/', (req, res) => {
    console.log(req.body)
    let product = req.body


    const numRandom = Math.floor(Math.random() * 200 + 1)
    product.id = numRandom + products.length

    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
        return res.status(400).send('Debe enviar todos los datos')
    }

    products.push(product)
    res.send({ status: 'success', msg: 'Producto Creado' })
})


router.get('/:pid', (req, res) => {
    let productId =parseInt(req.params.pid)

    const productFound = products.find(product => product.id === productId)
    if (!productFound) {
        return res.status(404).send('Producto no encontrado')
    }
    res.send(productFound)
});



export default router;