const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");

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
  pool.query(query, function (err, data) {
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

  pool.query(query, function (err, data) {
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
  pool.query(query, function (err) {
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

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error edit books");
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/edit", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;
  const id = req.body.id;

  const query = `UPDATE books SET title = "${title}", pageqty = ${pageqty} WHERE id = ${id}`;

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error edit books post");
    }
    res.redirect("/books/rescuebooks");
  });
});

app.post("/books/delete/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM books WHERE id = ${id}`;

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error delete books");
    }
    res.redirect("/books/rescuebooks");
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
