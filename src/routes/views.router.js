import express from 'express'
import fs from 'fs/promises'
import path from 'path'

let products =[]

async function readJson() {  
    try {  
        const productFilePath = path.resolve('data', 'productos.json')
        const data = await fs.readFile(productFilePath, 'utf8');   
        products = JSON.parse(data);
        console.log(products); 
        
    } catch (error) {  
        console.error(error);  
    }  
    
}  

readJson();

const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', { products })
})

export default router