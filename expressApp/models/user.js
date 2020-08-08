const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [{ productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, required: true } }],
    },
});

module.exports = mongoose.model("User", userSchema);
