import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import ProductManager from './services/ProductManager.js'


const app = express();
const PORT = 8080

const httpServer = app.listen(PORT, () => { console.log('Servidor corriendo en ' + PORT)});
const socketServer = new Server (httpServer)


const productManager = new ProductManager()

socketServer.on('connection', socket =>{
    console.log("Nuevo Cliente conectado")

socket.on("mensaje2",data=>{
    console.log("Recibido",data)
})
socket.on("formulario",data=>{
    if (!data.title || !data.description || !data.code || !data.price || !data.stock || !data.category) {
        socket.emit('error', { error: "Todos los campos son obligatorios" });
        return;
    }
    productManager.addProduct(data)
.then(()=>{
    socket.emit(`success`, {message : "Producto Agregado Correctamente"})
    let products = productManager.products
    socket.emit('productos',products)
})
.catch(error=>{
    socket.emit('error', {error: "Error al agregar producto"})
})









})







})



app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname+'/public'))




app.use('/',viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts',cartRouter)







