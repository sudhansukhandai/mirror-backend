/**
 * Created by shudhansu
 */
"use strict";

var express = require("express");
var bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
//var async = require("async");
var session = require("express-session");

var db_tools = require("./tools/db_tools");

var app = express();

//Storing SessionID in cookie.
app.use(
    session({
        secret: "super.super.secret.shhh",
        key: "sessionID",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    })
);
//app.use(json2xls.middleware);
app.use(fileUpload());
app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,access-token,X-Key,group_id"
    );
    if (req.method == "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

//Mongo DB Connection
db_tools
    .DBConnectMongoose()
    .then(() => {
        var routes = require("./routes/routes");

        // configure app to use bodyParser()
        // this will let us get the data from a POST
        app.use(
            bodyparser.urlencoded({
                extended: true
            })
        );
        app.use(
            bodyparser.json({
                limit: "10mb"
            })
        );

        routes.assignRoutes(app);

        app.set("port", process.env.PORT || 8586);
        var server = app.listen(app.get("port"), function() {
            console.log(
                "Express server listening on port " + server.address().port
            );
        });
    })
    .catch(err => {
        console.log("Error: " + err);
    });
