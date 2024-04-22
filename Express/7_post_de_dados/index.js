const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
const basePath = path.join(__dirname, "templates");

app.get("/users/add", (req, res) => {
  res.sendFile(`${basePath}/usersform.html`);
});

app.post("/users/save", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  console.log(`O noem do usuário é [${name}] e ele possui [${age}] anos.`);

  res.sendFile(`${basePath}/usersform.html`);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  console.log(`Estamos buscado pelo usuario: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
