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
    const cartId = carts.find(c => c.id === +req.params.cid);
    res.send(cartId.products);
})

routerCarts.post('/:cid/product/:pid', (req, res) => {
    const cartId = carts.find(c => c.id === +req.params.cid);
    const productId = +req.params.pid;
    let quantity = 1;
    
    if(cartId.products.length === 0) {
        const productToCart = {
            product: productId,
            quantity: quantity
        }

        cartId.products.push(productToCart);
    } else {
        cartId.products.forEach(p => {
            p.quantity++;
        });
    }
    
    cartList.writeData(carts);
    res.send('Producto añadido')
    console.log(cartId.products.length);
    console.log(productId);
})

module.exports = {
    routerCarts
}