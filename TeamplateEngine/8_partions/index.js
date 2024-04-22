const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "JavaScript",
    body: "Este artigo vai te ajudar a aprender Node Js",
    comments: 4,
  };

  res.render("blogpost", { post });
});

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Aprender Node.js",
      category: "JavaScript",
      body: "Este artigo vai te ajudar a aprender Node Js",
      comments: 4,
    },
    {
      title: "Aprender PHP",
      category: "PHP",
      body: "Este artigo vai te ajudar a aprender PHP",
      comments: 5,
    },
    {
      title: "Aprender HTML5",
      category: "HTML5",
      body: "Este artigo vai te ajudar a aprender HTML5",
      comments: 6,
    },
  ];

  res.render("blog", {posts});
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
