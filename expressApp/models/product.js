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
        return db
            .collection("products")
            .find()
            .toArray()
            .then()
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Product;
