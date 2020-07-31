productsArray = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        productsArray.push(this);
    }

    // static methods are quite similar to the one in java
    static fetchAll() {
        return productsArray;
    }
};
