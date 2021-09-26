const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

//allow origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db
const db = require("./models");
const Role = db.role;

db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and Resync Db");
//     initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// routes
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/employeeRoutes')(app);
require('./routes/performanceRoutes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    Role.create({
      id: 1,
      name: "admin"
    });
   
    Role.create({
      id: 2,
      name: "user"
    });
  }

