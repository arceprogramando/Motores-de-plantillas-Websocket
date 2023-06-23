// Servidor
import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', 8080);

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// eslint-disable-next-line no-console
const server = app.listen(app.get('port'), () => console.log(`Puerto encendido en el ${app.get('port')}:\n http://localhost:${app.get('port')}`));

app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', viewRouter);

const io = new Server(server);

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('Saludo desde el Servidor');

  socket.on('message', (data) => {
    // eslint-disable-next-line no-console
    console.log(data); // Imprimir el mensaje recibido desde el cliente
  });
});
