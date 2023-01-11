const express = require('express');
const routerCarts = express.Router();
const {cartList} = require('../persistence')

const carts = cartList.readFile();

routerCarts.post('/', (req, res) => {
    const cart = {
        products: []
    }
    
    cartList.addCart(cart);
    res.send('Carrito Creado');
})


routerCarts.get('/:cid', (req, res) => {
    const cartId = carts.find(c => c.id === + req.params.cid);
    res.send(cartId.products);
})

routerCarts.post('/:cid/product/:pid', (req, res) => {
    const cartId = carts.find(c => c.id === +req.params.cid);
    let quantity = 0;
    const productId = +req.params.pid
    if(quantity >= 0) {
        quantity++;
    }
    const productToCart = {
        product: productId,
        quantity: quantity
    }

    cartId.products.push(productToCart);
    cartList.writeData(cartId);
    res.send('Producto añadido')
})

module.exports = {
    routerCarts
}