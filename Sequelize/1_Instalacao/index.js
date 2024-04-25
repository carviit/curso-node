const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
