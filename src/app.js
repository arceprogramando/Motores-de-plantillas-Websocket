import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import __dirname from "./utils.js";


const app = express()

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
const PORT = 8080

const server = app.listen(PORT, () => console.log(`server on in port http://localhost:${PORT}`))

const io = new Server(server)

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
})