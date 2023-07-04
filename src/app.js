// Servidor
import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import productRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();

// Middleware

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', 8080);
// Handlebars

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`=Encendido servidor en puerto ${app.get('port')}= \n====== http://localhost:${app.get('port')}/ =====`);
});

app.use('/', productRouter);
app.use('/', viewsRouter);
app.use('/', cartsRouter);

const io = new Server(server);

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('Saludo desde el servidor');
  socket.on('message', (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });
});
