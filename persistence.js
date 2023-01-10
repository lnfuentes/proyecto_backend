const fs = require('fs');

class ProductManager {
    static productId = 0;
    constructor(path) {
        this.path = path;
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
}

const productList = new ProductManager('database/products.json');
const cartList = new ProductManager('database/carts.json');

module.exports = {
    productList,
    cartList
}