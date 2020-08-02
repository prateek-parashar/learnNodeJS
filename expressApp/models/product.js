const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "productValue.json");

const readDataFromFile = (cb) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageURL, description, price) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    save() {
        readDataFromFile((productsArray) => {
            productsArray.push(this);
            fs.writeFile(filePath, JSON.stringify(productsArray), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    update() {
        readDataFromFile((productList) => {
            const existingProductIndex = productList.findIndex((p) => p.id === this.id);
            const updatedProductList = [...productList];
            updatedProductList[existingProductIndex] = this;

            fs.writeFile(filePath, JSON.stringify(updatedProductList), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    // static methods are quite similar to the one in java
    static fetchAll(cb) {
        readDataFromFile(cb);
    }

    static findProductById(id, cb) {
        readDataFromFile((productList) => {
            const prod = productList.find((p) => p.id === id);
            cb(prod);
        });
    }
};
