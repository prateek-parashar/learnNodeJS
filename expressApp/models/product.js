const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const { createBrotliCompress } = require("zlib");
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
    constructor(title) {
        this.title = title;
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

    // static methods are quite similar to the one in java
    static fetchAll(cb) {
        readDataFromFile(cb);
    }
};
