const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());

app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/", (req, res) => {
  const user = {
    name: "Carlos",
    surname: "Vitor",
    age: "22",
  };

  const carro = "BMW 320i";

  const auth = true;

  const approved = false;

  res.render("home", { user: user, carro, auth, approved });
});

app.listen(4000, () => {
  console.log("App funcionando!");
});
