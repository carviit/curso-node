const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());

app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/", (req, res) => {
  const user = {
    name: "Carlos",
    surname: "Vitor",
    age: "22",
  };

  const carro = "BMW 320i";

  const auth = true;

  res.render("home", { user: user, carro, auth });
});

app.listen(4000, () => {
  console.log("App funcionando!");
});
