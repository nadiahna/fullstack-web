const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/usersModel")(sequelize, Sequelize);
db.role = require("../models/roleModel")(sequelize, Sequelize);
db.performance = require("../models/perfomanceModel")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.belongsToMany(db.user, {
  through: "performance_reviews",
  as: "id_reviewer_recipient",
  foreignKey: "id",
})
db.user.belongsToMany(db.user, {
  through: "performance_reviews",
  as: "id_reviewer",
  foreignKey: "id",
})

db.ROLES = ["user", "admin"];

module.exports = db;
