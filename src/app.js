import express from 'express';
import config from './config/config.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import initializeCustomPassport from './config/passport.config.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();

mongoose.set('strictQuery', true);
const connection = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PASSWORD}@clusterdeprueba.ozm98v9.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`)

console.log(config);

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

initializeCustomPassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars')
app.use('/', viewsRouter);

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
//ver plantilla front ingresar productos en final de clase 12 y clase motor de plantillas.

const PORT = process.env.PORT || config.app.PORT;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use( (req, res, next) => {
    res.status(404).send({ error : "404", description: `path '${req.path}' method '${req.method}' not implemented`})
    next();
})