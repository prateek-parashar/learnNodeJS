const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
    static addToCart(product) {
        //Fetch the existing cart (make a new one if it doesn't exist)
        let cart = { products: [], totalPrice: 0 };
        fs.readFile(filePath, (err, data) => {
            if (!err) {
                cart = JSON.parse(data);
            }
            //Find the product to be added
            const existingProductIndex = cart.products.findIndex(
                (p) => p.id === product.id
            );

            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                //If present, increase the quantity
                //Update the product in the cart
                updatedProduct.quantity += 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                //else add the product to the cart
                // Add the new product to the cart
                updatedProduct = { id: product.id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            // Update the price accordingly
            cart.totalPrice += +product.price;

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
};
