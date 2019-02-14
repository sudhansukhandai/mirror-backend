var db_tools = require("../tools/db_tools");
var mongoose = require("mongoose");

var db = db_tools.DBConnectMongoose();

var UserRegistrationSchema = new mongoose.Schema({
    name: { type: String },

    mobile: { type: String },

    area: { type: String },

    item: { type: String },

    quantity: { type: String },

    price: { type: String },

    paid: { type: String },

    total: { type: String },

    pendingPrice: { type: String },

    created_at: { type: Date, default: Date.now }
});

var UserRegistration = mongoose.model("user", UserRegistrationSchema);

exports.UserRegistration = UserRegistration;

exports.createUser = function(userData) {
    var registration = new UserRegistration(userData);
    return new Promise(function(resolve, reject) {
        console.log("save data--", userData);
        registration
            .save()
            .then(registration => {
                console.log("test1", registration);
                resolve(registration);
            })
            .catch(err => {
                console.log("test2", err);
                reject(err);
            });
    });
};
