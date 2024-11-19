import { error } from 'console';
import { readFile } from 'fs';
import fs from 'fs/promises'
import path from 'path'


const cartsFilePath = path.resolve('data', 'carritos.json')

export default class CartManager {

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








    async addProduct(productInfo) {
        const newProduct = { productInfo }

    }



}