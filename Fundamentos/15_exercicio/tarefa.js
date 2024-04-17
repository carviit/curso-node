const inquirer = require("inquirer");
const chalk = require("chalk")

inquirer
  .prompt([
    { name: "nome", message: "Qual seu nome:" },
    { name: "idade", message: "Qual sua idade:" },
  ])
  .then((answers) => {

    console.log(chalk.bgYellow.black(`O seu nome é ${answers.nome} e você possui ${answers.idade} anos.`))

  })
  .catch((err) => console.log(`Erro: ${err}`));
