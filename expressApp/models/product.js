productsArray = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        productsArray.push(this);
    }

    static fetchAll() {
        return productsArray;
    }
};
