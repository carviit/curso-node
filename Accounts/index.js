// Módulos Externos

const inquirer = require("inquirer");
const chalk = require("chalk");
const clear = require("clear");

// Módulos internos

const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Bem Vindo ao BANCO MOURA, oque você deseja fazer?\n",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action == "Criar Conta") {
        clear();
        createAccount();
        buildAccount();
      } else if (action == "Depositar") {
        deposit();
      } else if (action == "Consultar Saldo") {
        clear();
        getAccountBalance();
      } else if (action == "Sacar") {
        clear();
        withdraw();
      } else if (action == "Sair") {
        clear();
        console.log(chalk.bgBlue.black("Obrigado por usar o nosso banco!"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o noso banco\n\n"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "\nDigite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        clear();
        console.log(
          chalk.bgRed.black("Essa conta já existe, escolha outro nome!")
        );

        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      clear();

      console.log(chalk.green("Parabéns, a sua conta foi criada\n"));
      operation();
    })
    .catch((err) => console.log(err));
}

function deposit() {
  clear();
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar: R$",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          clear();

          addAmout(accountName, amount);

          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    clear();
    console.log(chalk.bgRed.black("Essa conta não existe!\n"));
    return false;
  }

  return true;
}

function addAmout(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    clear();
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );

    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(
      `Foi depositado o valor de R$${amount} na conta ${accountName}\n`
    )
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    enconding: "utf=8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      clear();
      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance}`
        )
      );

      operation();
    })
    .catch((err) => console.log(err));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar: R$",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    clear();
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );

    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor para saque indisponível."));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$ ${amount} da sua conta`)
  );

  operation();
}
