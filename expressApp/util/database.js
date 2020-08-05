//Importing it like this cause intellisense doesn't seem to work otherwise
// https://github.com/sequelize/sequelize/issues/11103
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodeshop", "postgres", "test", { dialect: "postgres", host: "localhost" });

module.exports = sequelize;
