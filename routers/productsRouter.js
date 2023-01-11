const express = require('express');
const routerProducts = express.Router();
const {productList} = require('../persistence'); 

const products = productList.readFile()

routerProducts.get('/', (req, res) => {
    const limit = req.query.limit;
    if(limit && !isNaN(Number(limit))) {
        const productLimit = products.slice(0, limit);
        res.send(productLimit);
    } else {
        res.send(products);
    }
})

routerProducts.get('/:pid', (req, res) => {
    const productId = products.find(p => p.id === +req.params.pid);
    res.send(productId);
})

routerProducts.post('/', (req, res) => {
    const product = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: [req.body.thumbnails]
    }

    productList.addProduct(product);
    res.send('Producto Creado');
})

routerProducts.put('/:pid', (req, res) => {
    let purchaseId = products.filter(p => p.id !== +req.params.pid);
    
    productToUpdate = {
        id: +req.params.pid,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: [req.body.thumbnails]
    }

    if(!productToUpdate.title || !productToUpdate.description || !productToUpdate.price || !productToUpdate.code || !productToUpdate.stock || !productToUpdate.category || !productToUpdate.status) {
        throw new Error('Todos los campos son obligatorios');
    } else {
        purchaseId.push(productToUpdate);
        productList.writeData(purchaseId);
    }

    res.send('Producto actualizado')
})

routerProducts.delete('/:pid', (req, res) => {
    const productToRemove = products.filter(p => p.id !== +req.params.pid);
    productList.writeData(productToRemove);

    res.send('producto eliminado');
})

module.exports = {
    routerProducts
}