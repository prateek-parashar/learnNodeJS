const pgp = require("pg-promise")();

const conn = {
    host: "localhost",
    port: 5432,
    database: "nodeshop",
    user: "postgres",
    password: "test",
    max: 30,
};

const db = pgp(conn);

module.exports = db;
