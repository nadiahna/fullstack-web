const { authJwt } = require("../middleware");
const performance = require("../controllers/perfomanceController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //create new relation perfomance
    app.post("/api/performance/create", [authJwt.verifyToken, authJwt.isAdmin], performance.create);

    // get all perfomance relation
    app.get("/api/performance/all", [authJwt.verifyToken, authJwt.isAdmin], performance.findAll);

    // get performance by id
    app.get("/api/performance/:id", [authJwt.verifyToken], performance.findOne);

    // get performance by id_reviewer
    app.get("/api/performanceBy/:id", [authJwt.verifyToken], performance.findAllByIdUser);

    //update performance by id
    app.post("/api/performance/update/:id", [authJwt.verifyToken], performance.update);

    //delete performance by id
    app.delete("/api/performance/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], performance.delete);

}