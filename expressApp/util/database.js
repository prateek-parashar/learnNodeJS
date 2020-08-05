const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodeshop", "postgres", "test", { dialect: "postgres", host: "localhost" });

module.exports = sequelize;
