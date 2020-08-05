const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.STRING,
});

module.exports = Product;
