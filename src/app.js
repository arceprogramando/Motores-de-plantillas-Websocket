import express from 'express';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.routes.js';
import multerRouter from './routes/services/uploader.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.set('port', 8080);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`server in port \n http://localhost:${app.get('port')}/`);
});

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/', multerRouter);
