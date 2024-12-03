import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'


const app = express();
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log('Servidor corriendo en ' + PORT)
});
const socketServer = new Server (httpServer)

socketServer.on('connection', socket =>{
    console.log("Nuevo Cliente conectado")
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







