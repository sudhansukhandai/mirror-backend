exports.assignRoutes = function(app) {
    var userController = require("../controller/userController");

    app.post("/userregistration", userController.userRegistration);
};
