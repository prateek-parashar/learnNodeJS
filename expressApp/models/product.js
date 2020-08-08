const mongodb = require("mongodb");

const { getDB } = require("../util/database");

class Product {
    constructor(title, price, description, imageURL) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
    }

    save() {
        const db = getDB();
        return db
            .collection("products")
            .insertOne(this)
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    static updateProduct(id, updatedProduct) {
        const db = getDB();
        return db
            .collection("products")
            .replaceOne({ _id: new mongodb.ObjectID(id) }, updatedProduct)
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDB();
        return db
            .collection("products")
            .find()
            .toArray()
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    static findById(id) {
        const db = getDB();
        return db
            .collection("products")
            .findOne({ _id: new mongodb.ObjectID(id) })
            .then((product) => {
                return product;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static deleteProduct(id) {
        const db = getDB();
        return db
            .collection("products")
            .deleteOne({ _id: new mongodb.ObjectID(id) })
            .then()
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Product;
