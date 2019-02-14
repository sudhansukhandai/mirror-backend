var usermodel = require("../model/userModel");

exports.userRegistration = function(req, res, next) {
    let usreData = req.body;
    let resObj;
    ///console.log("usreData", usreData);
    usermodel
        .createUser(usreData)
        .then(dbResponse => {
            resObj = {
                status: true,
                message: {
                    response: "data found sucessfully",
                    data: dbResponse
                }
            };
            res.send(resObj);
        })
        .catch(err => {
            resObj = {
                status: true,
                message: {
                    response: "data found sucessfully",
                    data: dbResponse
                }
            };
            res.status(400).send(resObj);
        });
};
