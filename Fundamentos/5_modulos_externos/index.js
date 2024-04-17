const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args);

const nome = args["nome"];
const curso = args["curso"];

console.log();

console.log(`O nome dele é ${nome} e ele cursa ${curso}.`);
