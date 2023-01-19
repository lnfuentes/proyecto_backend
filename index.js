const express = require('express');
const app = express();
const {routerCarts} = require('./routers/cartsRouter');
const {routerProducts} = require('./routers/productsRouter');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const {productList} = require('./persistence');

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/carts', routerCarts);
app.use('/api/products', routerProducts);

let products = productList.readFile();

app.get('/', (req, res) => {
    res.render('home', {products});
})

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

socketServer.on('connection', (socket) => {
    console.log('conectado');
    socket.on('message', async data => {
        await products;
        products.push({title: data});
        await productList.writeData(products);
        socketServer.emit('paragraph', products);
    })
})
