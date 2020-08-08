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
        console.log(id);
        return db
            .collection("products")
            .findOne({ _id: mongodb.ObjectID(id) })
            .then((product) => {
                return product;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Product;
