const fs = require('fs');

class Persistence {
    static id = 0;
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.products = [];
    }

    writeData(data) {
        try {
            let dataString = JSON.stringify(data);
            fs.writeFileSync(this.path, dataString);
        } catch (error) {
            throw new Error(error);
        }
    }

    readFile() {
        try {
            const data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    addCart(cart) {
        cart.id = Persistence.id++;
        this.carts.push(cart);
        this.writeData(this.carts);
    }

    addProduct(product) {
        product.id = Persistence.id++;

        if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category || !product.status) {
            throw new Error('Todos los campos son obligatorios');
        } else {
            this.products.push(product);
            this.writeData(this.products);
        }

    }
}

const productList = new Persistence('database/products.json');
const cartList = new Persistence('database/carts.json');

module.exports = {
    productList,
    cartList
}