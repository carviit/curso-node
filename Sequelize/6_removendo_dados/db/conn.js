const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodesequelize", "root", "0404", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
