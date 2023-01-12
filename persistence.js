const fs = require('fs');

class Persistence {
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
            // throw new Error(error);
        }
    }

    addCart(cart) {
        if(!this.readFile()) {
            cart.id = 1;
            this.carts.push(cart);
            this.writeData(this.carts);
        } else {
            const addProducts = this.readFile();
            cart.id = addProducts.length+1;
            addProducts.push(cart);
            this.writeData(addProducts);
        }
    }

    addProduct(product) {
        product.id = 1;

        if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category || !product.status) {
            throw new Error('Todos los campos son obligatorios');
        } else if(!this.readFile()) {
            this.products.push(product);
            this.writeData(this.products);
        } else {
            const addProduct = this.readFile();
            product.id = addProduct.length+1;
            addProduct.push(product);
            this.writeData(addProduct);
        }
    }
}

const productList = new Persistence('database/products.json');
const cartList = new Persistence('database/carts.json');

module.exports = {
    productList,
    cartList
}