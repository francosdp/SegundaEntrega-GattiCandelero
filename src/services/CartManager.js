import { readFile } from 'fs/promises';
import fs from 'fs/promises'
import path from 'path'

const cartsFilePath = path.resolve('data', 'carritos.json')

const productsFilePath = path.join('data', 'productos.json')



export default class CartManager {


    async readProducts() {
        try {
            const data = await readFile(productsFilePath, 'utf-8')
            const products = JSON.parse(data)
            return products
        } catch (error) {
            console.log(error)
        }

    }

    async saveFile() {
        const jsonData = JSON.stringify(this.carts, null, 2);
        await fs.writeFile(cartsFilePath, jsonData)
    }



    constructor() {
        this.carts = []
        this.init()
    }
    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8')
            this.carts = JSON.parse(data)
        } catch (error) {
            this.carts = []
        }
    }

    async getAllCarts() {
        return this.carts
    }



    async addCart() {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []
        }
        this.carts.push(newCart)
        this.saveFile()
        return newCart
    }

    async findCart(id) {
        const foundCart = this.carts.find(cart => cart.id === id)
        console.log(foundCart)
        if (!foundCart) {
            return null
        }
        return foundCart.products
    }

    async addProduct(id, productId, amount) {
        const products = await this.readProducts()

        const foundCart = this.carts.find(cart => cart.id === id)
        const findProduct = await products.find(product => product.id === productId)
            const existingProduct = foundCart.products.find(product => product.product === findProduct.id)

            if (!existingProduct) {
                const newProduct = {
                    product: findProduct.id,
                    quantity: amount
                }
                foundCart.products.push(newProduct)
            } else {
                const toBeUpdatedProduct = foundCart.products.findIndex(product => product.product === existingProduct.product)
                const updatedProduct = {
                    product: findProduct.id,
                    quantity: existingProduct.quantity + amount
                }

                foundCart.products[toBeUpdatedProduct] = updatedProduct
                
            }
        

        this.saveFile()
        return foundCart

    }
}