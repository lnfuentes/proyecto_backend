const express = require('express');
const routerCarts = express.Router();


routerCarts.post('/', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

module.exports = {
    routerCarts
}