import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'



const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res)=>{
    res.send("Hola")
});


app.use('/api/products', productRouter)
app.use('/api/carts',cartRouter)






app.listen(PORT, () => {
    console.log('Servidor corriendo en ' + PORT)
});

