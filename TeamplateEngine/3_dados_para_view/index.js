const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Carlos",
    surname: "Vitor",
    age: "22",
  };

  const carro = "BMW 320i";

  res.render("home", { user: user, carro });
});

app.listen(4000, () => {
  console.log("App funcionando!");
});
