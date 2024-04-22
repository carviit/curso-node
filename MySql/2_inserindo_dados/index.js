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

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;
  conn.query(query, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting book");
    }
    res.redirect("/");
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
