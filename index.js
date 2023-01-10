const express = require('express');
const app = express();
const {routerCarts} = require('./routers/cartsRouter');
const {routerProducts} = require('./routers/productsRouter');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/carts', routerCarts);
app.use('/api/products', routerProducts);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})