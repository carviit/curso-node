const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/books/rescuebooks", (req, res) => {
  const query = "SELECT * FROM books";
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error rescue book");
    }
    const books = data;
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error rescue books where");
    }
    const book = data[0];
    res.render("book", { book });
  });
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;
  conn.query(query, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting book");
    }
    res.redirect("/books/rescuebooks");
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error rescue books where");
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0404",
  database: "nodemysql",
});

conn.connect(function (err) {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL!");
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
});
