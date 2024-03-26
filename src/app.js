import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import productRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', 8080);

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const server = app.listen(app.get('port'), () => {
  console.log(`=Encendido servidor en puerto ${app.get('port')}= \n====== http://localhost:${app.get('port')}/ =====`);
});

app.use('/api/products', productRouter);
app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Saludo desde el servidor');
  socket.on('message', (data) => {
    console.log(data);
  });
});
