const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
    },

    resetTokenExpiration: {
        type: Date,
    },
    cart: {
        items: [
            {
                productID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
});

userSchema.methods.addToCart = function (product) {
    // Try and fetch the index of the product to be added
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productID.toString() === product._id.toString();
    });

    let newQuantity = 1;

    // Create an updated cartItems array by spreading the existing one
    const updatedCartItems = [...this.cart.items];

    // If item exists, update its quantity
    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        // If it doesn't exist, create a new one
        updatedCartItems.push({
            productID: product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };

    // Update the cart of the user
    this.cart = updatedCart;

    // Save the updated user
    return this.save();
};

userSchema.methods.deleteFromCart = function (productID) {
    const updatedCartItems = this.cart.items.filter((cp) => {
        return cp.productID.toString() !== productID.toString();
    });

    this.cart.items = updatedCartItems;

    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

module.exports = mongoose.model("User", userSchema);
