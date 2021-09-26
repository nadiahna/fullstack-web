const { authJwt } = require("../middleware");
const employee = require("../controllers/employeeController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //create new employee
    app.post("/api/employee/create", [authJwt.verifyToken, authJwt.isAdmin], employee.create);

    // get all employee
    app.get("/api/employee/all", [authJwt.verifyToken, authJwt.isAdmin], employee.findAll);

    // get employee by id
    app.get("/api/employee/:id", [authJwt.verifyToken, authJwt.isAdmin], employee.findOne);

    //update employee by id
    app.post("/api/employee/update/:id", [authJwt.verifyToken, authJwt.isAdmin], employee.update);

    //delete employee by id
    app.delete("/api/employee/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], employee.delete);

}