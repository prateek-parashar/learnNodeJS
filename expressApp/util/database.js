const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
    MongoClient.connect("mongodb+srv://prateek:i06ph4rYHQNkTIAf@cluster0.kybvw.mongodb.net/test?retryWrites=true&w=majority")
        .then((client) => {
            console.log("Connected to cloud DB");
            cb(client);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = mongoConnect;
