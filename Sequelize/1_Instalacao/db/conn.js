const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodesequelize", "root", "0404", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso com o Sequelize!");
} catch (err) {
  console.log("Não foi possível conectar ao banco de dados!");
  console.log("ERRO: ", err);
}

module.exports = sequelize;
