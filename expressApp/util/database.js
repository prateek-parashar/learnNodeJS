const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    MongoClient.connect("mongodb+srv://prateek:i06ph4rYHQNkTIAf@cluster0.kybvw.mongodb.net/shop?retryWrites=true&w=majority")
        .then((client) => {
            console.log("Connected to cloud DB");
            _db = client.db();
            cb();
        })
        .catch((err) => {
            console.log(err);
            throw "Could not connect to the cloud DB";
        });
};

const getDB = () => {
    if (_db) {
        return _db;
    }

    throw "No Database found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
