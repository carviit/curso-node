const path = require("path");

// Path Absoluto

console.log(path.resolve("teste.txt"));

// Formar Parth

const midFolder = "relatorios";
const fileName = "carlos.txt";

const finalPath = path.join("/", "arquivos", midFolder, fileName);

console.log(finalPath);
