"use strict";

var mongoose = require("mongoose");
var config = require("../config/config.json");

var db;

exports.DBConnectMongoose = function() {
    return new Promise(function(resolve, reject) {
        if (db) {
            return db;
        }
        mongoose.Promise = global.Promise;

        // database connect
        var livedb = process.env.MONGO_URI || process.env.MONGODB_URI;
        //var livedb = 'mongodb://heroku_df1ptfbp:u24453dn5cnc5l6smvp1a0lnkp@ds153752.mlab.com:53752/heroku_df1ptfbp'
        var localdb =
            "mongodb://" +
            config.db_config.host +
            ":" +
            config.db_config.port +
            "/" +
            config.db_config.name;

        let db_env = {
            useNewUrlParser: true
        };
        mongoose
            .connect(
                localdb,
                db_env
            )
            .then(() => {
                resolve(db);
            })
            .catch(err => {
                console.log("error creating db connection: " + err);
                reject(db);
            });
    });
};
